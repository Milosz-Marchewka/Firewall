import { useEffect, useState, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import DraftScreen from '../draft/DraftScreen.jsx';

const RoomScreen = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('joining');
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [players, setPlayers] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let isCancelled = false;

        const join = () => {
            setStatus('joining');
            setError(null);

            if (!socket.connected) socket.connect();

            socket.emit('join-room', token, (ack) => {
                if (isCancelled) return;

                if (!ack?.ok) {
                    setError(ack?.error ?? 'join_failed');
                    setStatus('error');
                    return;
                }

                setRole(ack.role ?? null);
                setPlayers(ack.players ?? null);
                setStatus('joined');
            });
        };

        join();

        const onRoomState = (payload) => {
            if (isCancelled) return;
            if (typeof payload?.players === 'number') setPlayers(payload.players);
        };

        const onRoomReady = () => {
            if (isCancelled) return;
            setStatus('ready');
        };

        socket.on('room-state', onRoomState);
        socket.on('room-ready', onRoomReady);

        return () => {
            isCancelled = true;
            socket.off('room-state', onRoomState);
            socket.off('room-ready', onRoomReady);
        };
    }, [token]);

    const handleLeave = () => {
        if (!socket.connected) {
            navigate('/');
            return;
        }

        socket.emit('leave-room', token, () => {
            navigate('/');
        });
    }

    if (status === 'error') {
        return (
            <div className="screen bg-neutral-700">
                <div>Failed to join room: {String(error)}</div>
            </div>
        );
    }

    return (
        <div className="screen bg-neutral-700">
            <DraftScreen/>
        </div>
    );
};

export default RoomScreen;
