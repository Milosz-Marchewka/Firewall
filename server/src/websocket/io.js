import { Server } from 'socket.io';
import Game from '../db/Game.js';
import { extractRoomToken } from '../utils.js';
import AbilityCatalog from '../temp/Abilities.js';

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const buildTokenRegex = (token) => new RegExp(`/room/${escapeRegex(token)}/?$`);
const countPlayers = (game) => (game?.attacker?.id != null ? 1 : 0) + (game?.defender?.id != null ? 1 : 0);
const roleDoneKey = (role) => (role === 'attacker' ? 'draft.attackerDone' : (role === 'defender' ? 'draft.defenderDone' : null));
const opponentRole = (role) => (role === 'attacker' ? 'defender' : 'attacker');

const getUsableAbilityCount = (game, role) => {
    const list = game?.[role]?.abilities ?? [];
    return list.reduce((count, a) => count + (((a?.currentCooldown ?? 0) <= 0) ? 1 : 0), 0);
};

const tickCooldownsForRole = (game, role) => {
    const list = game?.[role]?.abilities ?? [];
    list.forEach((a) => {
        if ((a?.currentCooldown ?? 0) > 0) a.currentCooldown = Math.max(0, a.currentCooldown - 1);
    });
};

const autoSkipUntilPlayable = (game, maxSteps = 20) => {
    // Returns true if the game state was changed.
    let changed = false;

    for (let i = 0; i < maxSteps; i++) {
        if (!game) break;
        if (game.status === 'finished') break;

        const current = game.currentTurn;
        if (current !== 'attacker' && current !== 'defender') break;

        // If the current player has something to do, stop.
        if (getUsableAbilityCount(game, current) > 0) break;

        // If neither side has abilities at all, don't spin forever.
        const attackerCount = (game?.attacker?.abilities ?? []).length;
        const defenderCount = (game?.defender?.abilities ?? []).length;
        if (attackerCount === 0 && defenderCount === 0) break;

        // Advance turn (this is essentially an auto-pass).
        let next = opponentRole(current);
        if ((game.skipTurns?.[next] ?? 0) > 0) {
            game.skipTurns[next] = Math.max(0, (game.skipTurns[next] ?? 0) - 1);
            next = current;
        }

        game.currentTurn = next;
        game.turnNumber = (game.turnNumber ?? 1) + 1;
        tickCooldownsForRole(game, next);
        changed = true;
    }

    return changed;
};

const toBattleState = (game) => {
    const attackerHp = game?.attacker?.stats?.persistence ?? 0;
    const defenderHp = game?.defender?.stats?.integrity ?? 0;

    const finished = game?.status === 'finished' || attackerHp <= 0 || defenderHp <= 0;
    const winner = finished
        ? (attackerHp <= 0 && defenderHp <= 0 ? 'draw' : (attackerHp <= 0 ? 'defender' : 'attacker'))
        : null;

    return {
        roomId: game._id.toString(),
        status: game.status,
        turnNumber: game.turnNumber,
        currentTurn: game.currentTurn,
        attacker: {
            hp: attackerHp,
            skipTurns: game?.skipTurns?.attacker ?? 0,
            overflow: game?.attacker?.stats?.overflow ?? 0,
            abilities: game?.attacker?.abilities ?? [],
        },
        defender: {
            hp: defenderHp,
            skipTurns: game?.skipTurns?.defender ?? 0,
            abilities: game?.defender?.abilities ?? [],
        },
        finished,
        winner,
    };
};

const releaseSocketFromRoom = async (io, socket, roomId) => {
    if (!roomId) return;

    const role = socket.data?.role;
    let updated = null;

    try {
        if (role === 'attacker' || role === 'defender') {
            const doneKey = roleDoneKey(role);
            updated = await Game.findOneAndUpdate(
                { _id: roomId, [`${role}.id`]: socket.id },
                { $set: { [`${role}.id`]: null, status: 'waiting', ...(doneKey ? { [doneKey]: false } : {}) } },
                { new: true }
            );
        }

        if (!updated) {
            updated = await Game.findOneAndUpdate(
                { _id: roomId, 'attacker.id': socket.id },
                { $set: { 'attacker.id': null, status: 'waiting', 'draft.attackerDone': false } },
                { new: true }
            );
        }

        if (!updated) {
            updated = await Game.findOneAndUpdate(
                { _id: roomId, 'defender.id': socket.id },
                { $set: { 'defender.id': null, status: 'waiting', 'draft.defenderDone': false } },
                { new: true }
            );
        }

        if (updated && updated.attacker?.id == null && updated.defender?.id == null) {
            await Game.deleteOne({ _id: roomId });
            updated = null;
        }
    } catch {
        // ignore
    }

    try {
        socket.leave(roomId);
        socket.to(roomId).emit('player-left', { roomId });
        if (updated) {
            socket.to(roomId).emit('room-state', { roomId, players: countPlayers(updated) });
            socket.to(roomId).emit('draft-status', {
                attackerDone: !!updated.draft?.attackerDone,
                defenderDone: !!updated.draft?.defenderDone,
            });
        }
    } catch {
        // ignore
    }

    if (socket.data?.roomId === roomId) {
        socket.data.roomId = null;
        socket.data.roomToken = null;
        socket.data.role = null;
    }
};

export default function createIo(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.URL_BASE ?? '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        socket.on('join-room', async (payload, ack) => {
            try {
                const raw = typeof payload === 'string'
                    ? payload
                    : (payload?.url ?? payload?.token ?? payload?.roomUrl ?? payload?.room);

                const token = extractRoomToken(raw);
                if (!token) {
                    const response = { ok: false, error: 'invalid_room' };
                    if (typeof ack === 'function') return ack(response);
                    socket.emit('join-error', response);
                    return;
                }

                const tokenRegex = buildTokenRegex(token);
                const game = await Game.findOne({ url: { $regex: tokenRegex } });
                if (!game) {
                    const response = { ok: false, error: 'not_found' };
                    if (typeof ack === 'function') return ack(response);
                    socket.emit('join-error', response);
                    return;
                }

                const roomId = game._id.toString();

                // If this socket is still associated with another room (e.g. browser back button
                // navigating away without a clean leave), release that old room before joining.
                if (socket.data?.roomId && socket.data.roomId !== roomId) {
                    await releaseSocketFromRoom(io, socket, socket.data.roomId);
                }

                // If this socket was already assigned a slot in this game, treat this as a re-join.
                // This happens in dev due to React StrictMode double-invoking effects.
                if (game.attacker?.id === socket.id || game.defender?.id === socket.id) {
                    const role = game.attacker?.id === socket.id ? 'attacker' : 'defender';

                    // If the socket was previously in another room, leave it.
                    if (socket.data?.roomId && socket.data.roomId !== roomId) {
                        socket.leave(socket.data.roomId);
                    }

                    socket.join(roomId);
                    socket.data.roomId = roomId;
                    socket.data.roomToken = token;
                    socket.data.role = role;

                    const response = { ok: true, roomId, players: countPlayers(game), role };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                if(game.status === 'finished'){
                    const response = { ok: false, error: 'finished' };
                    if (typeof ack === 'function') return ack(response);
                    socket.emit('join-error', response);
                    return;
                }

                let role;
                if(game.attacker?.id == null && game.defender?.id == null){
                    role = Math.random() < 0.5 ? 'attacker' : 'defender';
                } else {
                    role = game.attacker?.id == null ? 'attacker' : (game.defender?.id == null ? 'defender' : null);
                }

                if (!role) {
                    const response = { ok: false, error: 'full' };
                    if (typeof ack === 'function') return ack(response);
                    socket.emit('join-error', response);
                    return;
                }

                socket.join(roomId);
                socket.data.roomId = roomId;
                socket.data.roomToken = token;

                const updated = await Game.findOneAndUpdate(
                    { _id: game._id, [`${role}.id`]: null },
                    { $set: { [`${role}.id`]: socket.id } },
                    { new: true }
                );

                // Slot was taken by a competing join.
                if (!updated) {
                    // Retry once with the latest DB state (the other slot might still be free).
                    const latest = await Game.findById(game._id);
                    if (!latest) {
                        socket.leave(roomId);
                        const response = { ok: false, error: 'not_found' };
                        if (typeof ack === 'function') return ack(response);
                        socket.emit('join-error', response);
                        return;
                    }
                    let retryRole;
                    if(latest.attacker?.id == null && latest.defender?.id == null){
                        retryRole = Math.random() < 0.5 ? 'attacker' : 'defender';
                    } else {
                        retryRole = latest.attacker?.id == null ? 'attacker' : (latest.defender?.id == null ? 'defender' : null);
                    }

                    if (retryRole && retryRole !== role) {
                        const retried = await Game.findOneAndUpdate(
                            { _id: game._id, [`${retryRole}.id`]: null },
                            { $set: { [`${retryRole}.id`]: socket.id } },
                            { new: true }
                        );

                        if (retried) {
                            socket.data.role = retryRole;
                            const playersAfterRetry = countPlayers(retried);
                            io.to(roomId).emit('room-state', { roomId, players: playersAfterRetry });
                            io.to(roomId).emit('player-joined', { roomId, role: retryRole });

                            const bothJoinedRetry = retried.attacker?.id != null && retried.defender?.id != null;
                            if (bothJoinedRetry && retried.status !== 'in_progress') {
                                await Game.updateOne(
                                    { _id: retried._id, status: { $ne: 'in_progress' } },
                                    { $set: { status: 'in_progress' } }
                                );
                                io.to(roomId).emit('room-ready', { roomId });
                            }

                            const response = { ok: true, roomId, players: playersAfterRetry, role: retryRole };
                            if (typeof ack === 'function') return ack(response);
                            return;
                        }
                    }

                    socket.leave(roomId);
                    const response = { ok: false, error: 'full' };
                    if (typeof ack === 'function') return ack(response);
                    socket.emit('join-error', response);
                    return;
                }

                socket.data.role = role;

                const playersAfterJoin = countPlayers(updated);
                io.to(roomId).emit('room-state', { roomId, players: playersAfterJoin });
                io.to(roomId).emit('player-joined', { roomId, role });

                const bothJoined = updated.attacker?.id != null && updated.defender?.id != null;
                if (bothJoined && updated.status !== 'in_progress') {
                    await Game.updateOne(
                        { _id: updated._id, status: { $ne: 'in_progress' } },
                        { $set: { status: 'in_progress' } }
                    );
                }

                if (bothJoined) {
                    io.to(roomId).emit('room-ready', { roomId });
                }

                const response = { ok: true, roomId, players: playersAfterJoin, role };
                if (typeof ack === 'function') return ack(response);
            } catch {
                const response = { ok: false, error: 'server_error' };
                if (typeof ack === 'function') return ack(response);
                socket.emit('join-error', response);
            }
        });

        // Get current draft completion flags for the room this socket is in.
        socket.on('draft-get', async (_payload, ack) => {
            try {
                const roomId = socket.data?.roomId;
                if (!roomId) {
                    const response = { ok: false, error: 'not_in_room' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const game = await Game.findById(roomId);
                if (!game) {
                    const response = { ok: false, error: 'not_found' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const response = {
                    ok: true,
                    attackerDone: !!game.draft?.attackerDone,
                    defenderDone: !!game.draft?.defenderDone,
                };
                if (typeof ack === 'function') return ack(response);
            } catch {
                const response = { ok: false, error: 'server_error' };
                if (typeof ack === 'function') return ack(response);
            }
        });

        // Mark this player's draft as completed.
        socket.on('draft-done', async (_payload, ack) => {
            try {
                const roomId = socket.data?.roomId;
                const role = socket.data?.role;
                const doneKey = roleDoneKey(role);

                if (!roomId || !doneKey) {
                    const response = { ok: false, error: 'not_in_room' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const updated = await Game.findByIdAndUpdate(
                    roomId,
                    { $set: { [doneKey]: true } },
                    { new: true }
                );

                if (!updated) {
                    const response = { ok: false, error: 'not_found' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const payload = {
                    attackerDone: !!updated.draft?.attackerDone,
                    defenderDone: !!updated.draft?.defenderDone,
                };

                io.to(roomId).emit('draft-status', payload);

                const bothDone = payload.attackerDone && payload.defenderDone;
                if (bothDone) {
                    io.to(roomId).emit('draft-complete', {});
                }

                const response = { ok: true, ...payload, bothDone };
                if (typeof ack === 'function') return ack(response);
            } catch {
                const response = { ok: false, error: 'server_error' };
                if (typeof ack === 'function') return ack(response);
            }
        });

        // Persist a draft pick into the Game document so battle can use it.
        socket.on('draft-pick', async (payload, ack) => {
            try {
                const roomId = socket.data?.roomId;
                const role = socket.data?.role;
                const code = typeof payload === 'string' ? payload : payload?.code;

                if (!roomId || (role !== 'attacker' && role !== 'defender') || !code) {
                    const response = { ok: false, error: 'bad_request' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const ability = await AbilityCatalog.findOne({ role, code });
                if (!ability) {
                    const response = { ok: false, error: 'ability_not_found' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const path = `${role}.abilities`;
                const updated = await Game.findOneAndUpdate(
                    {
                        _id: roomId,
                        // limit to 4 picks
                        [`${path}.3`]: { $exists: false },
                        // avoid duplicates
                        [`${path}.code`]: { $ne: code },
                    },
                    {
                        $push: {
                            [path]: {
                                code: ability.code,
                                name: ability.name,
                                description: ability.description,
                                cooldown: ability.cooldown,
                                currentCooldown: 0,
                                rarity: ability.rarity,
                                effect: ability.effect,
                            },
                        },
                    },
                    { new: true }
                );

                if (!updated) {
                    const current = await Game.findById(roomId);
                    const currentCount = current?.[role]?.abilities?.length ?? 0;
                    const alreadyPicked = (current?.[role]?.abilities ?? []).some((a) => a.code === code);

                    const response = {
                        ok: false,
                        error: alreadyPicked ? 'already_picked' : (currentCount >= 4 ? 'draft_full' : 'server_error'),
                        count: currentCount,
                    };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const response = { ok: true, count: updated?.[role]?.abilities?.length ?? 0 };
                if (typeof ack === 'function') return ack(response);
            } catch {
                const response = { ok: false, error: 'server_error' };
                if (typeof ack === 'function') return ack(response);
            }
        });

        socket.on('battle-get', async (_payload, ack) => {
            try {
                const roomId = socket.data?.roomId;
                if (!roomId) {
                    const response = { ok: false, error: 'not_in_room' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const game = await Game.findById(roomId);
                if (!game) {
                    const response = { ok: false, error: 'not_found' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const changed = autoSkipUntilPlayable(game);
                if (changed) {
                    await game.save();
                    io.to(roomId).emit('battle-state', toBattleState(game));
                }

                const response = { ok: true, state: toBattleState(game) };
                if (typeof ack === 'function') return ack(response);
            } catch {
                const response = { ok: false, error: 'server_error' };
                if (typeof ack === 'function') return ack(response);
            }
        });

        socket.on('battle-use', async (payload, ack) => {
            try {
                const roomId = socket.data?.roomId;
                const role = socket.data?.role;
                const code = typeof payload === 'string' ? payload : payload?.code;

                if (!roomId || (role !== 'attacker' && role !== 'defender') || !code) {
                    const response = { ok: false, error: 'bad_request' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const game = await Game.findById(roomId);
                if (!game) {
                    const response = { ok: false, error: 'not_found' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                if (game.status === 'finished') {
                    const response = { ok: false, error: 'finished', state: toBattleState(game) };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                if (game.currentTurn !== role) {
                    const response = { ok: false, error: 'not_your_turn', state: toBattleState(game) };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const myAbilities = game?.[role]?.abilities ?? [];
                const index = myAbilities.findIndex((a) => a.code === code);
                if (index === -1) {
                    const response = { ok: false, error: 'ability_not_found', state: toBattleState(game) };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const ability = myAbilities[index];
                if ((ability.currentCooldown ?? 0) > 0) {
                    const response = { ok: false, error: 'cooldown', state: toBattleState(game) };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                // Put ability on cooldown
                ability.currentCooldown = ability.cooldown ?? 0;

                const other = opponentRole(role);
                const effectKind = ability?.effect?.kind;
                const effectValue = Number(ability?.effect?.value ?? 0);

                if (effectKind === 'damage') {
                    if (other === 'defender') {
                        const overflowBonus = role === 'attacker' ? Number(game.attacker?.stats?.overflow ?? 0) : 0;
                        const totalDamage = effectValue + overflowBonus;
                        if (role === 'attacker') game.attacker.stats.overflow = 0;
                        game.defender.stats.integrity = Math.max(0, (game.defender.stats.integrity ?? 0) - totalDamage);
                    } else {
                        game.attacker.stats.persistence = Math.max(0, (game.attacker.stats.persistence ?? 0) - effectValue);
                    }
                } else if (effectKind === 'heal') {
                    if (role === 'defender') {
                        const current = Number(game.defender.stats.integrity ?? 0);
                        const raw = current + effectValue;
                        if (raw > 20) {
                            const overflow = raw - 20;
                            const reducedOverflow = Math.floor(overflow / 2);
                            game.defender.stats.integrity = 20 + reducedOverflow;
                        } else {
                            game.defender.stats.integrity = raw;
                        }
                    } else {
                        const current = Number(game.attacker.stats.persistence ?? 0);
                        const raw = current + effectValue;
                        if (raw > 20) {
                            const overflow = raw - 20;
                            const reducedOverflow = Math.floor(overflow / 2);
                            game.attacker.stats.persistence = 20;
                            game.attacker.stats.overflow = Number(game.attacker.stats.overflow ?? 0) + reducedOverflow;
                        } else {
                            game.attacker.stats.persistence = raw;
                        }
                    }
                } else if (effectKind === 'freeze') {
                    game.skipTurns[other] = Math.max(0, (game.skipTurns?.[other] ?? 0) + effectValue);
                }

                game.log.push({
                    turn: game.turnNumber,
                    player: role,
                    action: {
                        type: 'ability',
                        ability: code,
                        effect: ability.effect,
                    },
                });

                // Win check
                const attackerHp = game.attacker.stats.persistence ?? 0;
                const defenderHp = game.defender.stats.integrity ?? 0;
                if (attackerHp <= 0 || defenderHp <= 0) {
                    game.status = 'finished';
                } else {
                    // Advance turn
                    let next = opponentRole(role);
                    if ((game.skipTurns?.[next] ?? 0) > 0) {
                        game.skipTurns[next] = Math.max(0, (game.skipTurns[next] ?? 0) - 1);
                        next = role;
                    }
                    game.currentTurn = next;
                    game.turnNumber = (game.turnNumber ?? 1) + 1;

                    // Cooldown tick happens when a player gets a turn.
                    tickCooldownsForRole(game, next);

                    // If the next player still can't act, auto-skip until someone can.
                    autoSkipUntilPlayable(game);
                }

                await game.save();

                const state = toBattleState(game);
                io.to(roomId).emit('battle-state', state);

                const response = { ok: true, state };
                if (typeof ack === 'function') return ack(response);
            } catch {
                const response = { ok: false, error: 'server_error' };
                if (typeof ack === 'function') return ack(response);
            }
        });

        socket.on('leave-room', async (payload, ack) => {
            try {
                const raw = typeof payload === 'string'
                    ? payload
                    : (payload?.url ?? payload?.token ?? payload?.roomUrl ?? payload?.room);

                const token = extractRoomToken(raw);
                const tokenRegex = token ? buildTokenRegex(token) : null;

                let game = null;
                if (socket.data?.roomId) {
                    game = await Game.findById(socket.data.roomId);
                }
                if (!game && tokenRegex) {
                    game = await Game.findOne({ url: { $regex: tokenRegex } });
                }

                if (!game) {
                    const response = { ok: false, error: 'not_found' };
                    if (typeof ack === 'function') return ack(response);
                    return;
                }

                const roomId = game._id.toString();
                const role = socket.data?.role;

                let updated = null;
                if (role === 'attacker' || role === 'defender') {
                    const doneKey = roleDoneKey(role);
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, [`${role}.id`]: socket.id },
                        { $set: {
                            [`${role}.id`]: null,
                            [`${role}.abilities`]: [],
                            [`skipTurns.${role}`]: 0,
                            status: 'waiting',
                            ...(doneKey ? { [doneKey]: false } : {})
                        } },
                        { new: true }
                    );
                }

                // Fallback: clear whichever slot matches this socket.
                if (!updated) {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, 'attacker.id': socket.id },
                        { $set: { 'attacker.id': null, 'attacker.abilities': [], 'skipTurns.attacker': 0, status: 'waiting', 'draft.attackerDone': false } },
                        { new: true }
                    );
                }
                if (!updated) {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, 'defender.id': socket.id },
                        { $set: { 'defender.id': null, 'defender.abilities': [], 'skipTurns.defender': 0, status: 'waiting', 'draft.defenderDone': false } },
                        { new: true }
                    );
                }

                let terminated = false;
                if (updated && updated.attacker?.id == null && updated.defender?.id == null) {
                    await Game.deleteOne({ _id: roomId });
                    terminated = true;
                }

                socket.leave(roomId);
                if (socket.data?.roomId === roomId) {
                    socket.data.roomId = null;
                    socket.data.roomToken = null;
                    socket.data.role = null;
                }

                const players = updated ? countPlayers(updated) : 0;
                socket.to(roomId).emit('room-state', { roomId, players });
                socket.to(roomId).emit('player-left', { roomId });
                if (updated) {
                    socket.to(roomId).emit('draft-status', {
                        attackerDone: !!updated.draft?.attackerDone,
                        defenderDone: !!updated.draft?.defenderDone,
                    });
                }

                const response = { ok: true, roomId, players, terminated };
                if (typeof ack === 'function') return ack(response);
            } catch {
                const response = { ok: false, error: 'server_error' };
                if (typeof ack === 'function') return ack(response);
            }
        });

        socket.on('disconnect', async () => {
            const roomId = socket.data?.roomId;
            if (!roomId) return;

            const role = socket.data?.role;
            let updated = null;

            try {

                if (role === 'attacker' || role === 'defender') {
                    const doneKey = roleDoneKey(role);
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, [`${role}.id`]: socket.id },
                        { $set: {
                            [`${role}.id`]: null,
                            [`${role}.abilities`]: [],
                            [`skipTurns.${role}`]: 0,
                            status: 'waiting',
                            ...(doneKey ? { [doneKey]: false } : {})
                        } },
                        { new: true }
                    );
                }

                // Fallback: if role wasn't stored, clear whichever slot matches this socket.
                if (!updated) {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, 'attacker.id': socket.id },
                        { $set: { 'attacker.id': null, 'attacker.abilities': [], 'skipTurns.attacker': 0, status: 'waiting', 'draft.attackerDone': false } },
                        { new: true }
                    );
                }

                if (!updated) {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, 'defender.id': socket.id },
                        { $set: { 'defender.id': null, 'defender.abilities': [], 'skipTurns.defender': 0, status: 'waiting', 'draft.defenderDone': false } },
                        { new: true }
                    );
                }

                if (updated && updated.attacker?.id == null && updated.defender?.id == null) {
                    await Game.deleteOne({ _id: roomId });
                }
            } catch {
                // ignore disconnect cleanup errors
            }

            socket.to(roomId).emit('player-left', { roomId });
            if (updated ?? null) {
                socket.to(roomId).emit('draft-status', {
                    attackerDone: !!updated.draft?.attackerDone,
                    defenderDone: !!updated.draft?.defenderDone,
                });
            }
        });
    });

    return io;
}