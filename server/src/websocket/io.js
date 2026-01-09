import { Server } from 'socket.io';
import Game from '../db/Game.js';
import { extractRoomToken } from '../utils.js';

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const countPlayers = (game) => (game?.attacker?.id != null ? 1 : 0) + (game?.defender?.id != null ? 1 : 0);

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

                const tokenRegex = new RegExp(`/room/${escapeRegex(token)}$`);
                const game = await Game.findOne({ url: { $regex: tokenRegex } });
                if (!game) {
                    const response = { ok: false, error: 'not_found' };
                    if (typeof ack === 'function') return ack(response);
                    socket.emit('join-error', response);
                    return;
                }

                const roomId = game._id.toString();

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

                const role = game.attacker?.id == null
                    ? 'attacker'
                    : (game.defender?.id == null ? 'defender' : null);

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
                    const retryRole = latest?.attacker?.id == null
                        ? 'attacker'
                        : (latest?.defender?.id == null ? 'defender' : null);

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

        socket.on('leave-room', async (payload, ack) => {
            try {
                const raw = typeof payload === 'string'
                    ? payload
                    : (payload?.url ?? payload?.token ?? payload?.roomUrl ?? payload?.room);

                const token = extractRoomToken(raw);
                const tokenRegex = token ? new RegExp(`/room/${escapeRegex(token)}$`) : null;

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
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, [`${role}.id`]: socket.id },
                        { $set: { [`${role}.id`]: null, status: 'waiting' } },
                        { new: true }
                    );
                }

                // Fallback: clear whichever slot matches this socket.
                if (!updated) {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, 'attacker.id': socket.id },
                        { $set: { 'attacker.id': null, status: 'waiting' } },
                        { new: true }
                    );
                }
                if (!updated) {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, 'defender.id': socket.id },
                        { $set: { 'defender.id': null, status: 'waiting' } },
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

            try {
                let updated = null;

                if (role === 'attacker' || role === 'defender') {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, [`${role}.id`]: socket.id },
                        { $set: { [`${role}.id`]: null, status: 'waiting' } },
                        { new: true }
                    );
                }

                // Fallback: if role wasn't stored, clear whichever slot matches this socket.
                if (!updated) {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, 'attacker.id': socket.id },
                        { $set: { 'attacker.id': null, status: 'waiting' } },
                        { new: true }
                    );
                }

                if (!updated) {
                    updated = await Game.findOneAndUpdate(
                        { _id: roomId, 'defender.id': socket.id },
                        { $set: { 'defender.id': null, status: 'waiting' } },
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
        });
    });

    return io;
}