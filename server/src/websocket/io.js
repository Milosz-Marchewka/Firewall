import { Server } from 'socket.io';
import Game from '../db/Game.js';
import { extractRoomToken } from '../utils.js';

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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
                const currentSize = io.sockets.adapter.rooms.get(roomId)?.size ?? 0;
                if (currentSize >= 2) {
                    const response = { ok: false, error: 'full' };
                    if (typeof ack === 'function') return ack(response);
                    socket.emit('join-error', response);
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
                    socket.leave(roomId);
                    const response = { ok: false, error: 'full' };
                    if (typeof ack === 'function') return ack(response);
                    socket.emit('join-error', response);
                    return;
                }

                socket.data.role = role;

                const sizeAfterJoin = io.sockets.adapter.rooms.get(roomId)?.size ?? 1;
                io.to(roomId).emit('room-state', { roomId, players: sizeAfterJoin });
                io.to(roomId).emit('player-joined', { roomId, role });

                const bothJoined = updated.attacker?.id != null && updated.defender?.id != null;
                if (bothJoined && updated.status !== 'in_progress') {
                    await Game.updateOne(
                        { _id: updated._id, status: { $ne: 'in_progress' } },
                        { $set: { status: 'in_progress' } }
                    );
                }

                if (bothJoined && sizeAfterJoin === 2) {
                    io.to(roomId).emit('room-ready', { roomId });
                }

                const response = { ok: true, roomId, players: sizeAfterJoin, role };
                if (typeof ack === 'function') return ack(response);
            } catch {
                const response = { ok: false, error: 'server_error' };
                if (typeof ack === 'function') return ack(response);
                socket.emit('join-error', response);
            }
        });

        socket.on('disconnect', () => {
            const roomId = socket.data?.roomId;
            if (roomId) {
                socket.to(roomId).emit('player-left', { roomId });
            }
        });
    });

    return io;
}