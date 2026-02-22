import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import DraftScreen from '../draft/DraftScreen.jsx';
import WaitingScreen from './WaitingScreen.jsx';
import BattleScreen from '../battle/BattleScreen.jsx';

const RoomScreen = ({user}) => {
    const { token } = useParams();
    const [status, setStatus] = useState('joining');
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [players, setPlayers] = useState(null);
    const [usernames, setUsernames] = useState({defender: "", attacker: ""});
    const [ranks, setRanks] = useState({defender: "", attacker: ""});
    const [roomType, setRoomType] = useState(null);

    const navigate = useNavigate();
    const leaveTimerRef = useRef(null);
    const draftTimerRef = useRef(null);
    const roomTypeRef = useRef(null);
    const statusRef = useRef(status);
    const DRAFT_DELAY_MS = 1500;

    useEffect(() => {
        statusRef.current = status;
    }, [status]);

    useEffect(() => {
        if (roomType === 'play' && players === 2) {
            setStatus('battle');
        }
    }, [roomType, players]);

    useEffect(() => {
        let isCancelled = false;

        const startDraftDelayed = () => {
            if (draftTimerRef.current != null) return;
            draftTimerRef.current = setTimeout(() => {
                draftTimerRef.current = null;
                if (isCancelled) return;
                setStatus('draft');
            }, DRAFT_DELAY_MS);
        };

        const onRoomState = (payload) => {
            if (isCancelled) return;
            console.log("ROOM_STATE_PAYLOAD:", payload);
            if (payload?.type) {
                roomTypeRef.current = payload.type;
                setRoomType(payload.type);
            }
            if (typeof payload?.players === 'number') {
                setPlayers(payload.players);
                const effectiveType = payload?.type ?? roomTypeRef.current;
                if (payload.players === 2 && effectiveType === "play"){
                    setStatus("battle");
                    return;
                }
                if (payload.players === 2) {
                    startDraftDelayed();
                }
            }
            setUsernames(payload?.usernames);
            setRanks(payload?.ranks);
            console.log("USERNAMES_STATE:", payload?.usernames ?? "uh..");
            
        };

        const onRoomReady = (payload) => {
            console.log("PAYLOAD: ", payload);
            console.log("ABOVE PAYLOAD STATUS: " , status);
            
            setUsernames(payload?.usernames);
            setRanks(payload?.ranks);
            if (payload?.type) {
                roomTypeRef.current = payload.type;
                setRoomType(payload.type);
            }
            const effectiveType = payload?.type ?? roomTypeRef.current;
            if(effectiveType === "play"){
                setStatus("battle");
                return;
            }

            startDraftDelayed();
        };

        const onPlayerLeft = () => {
            if (isCancelled) return;
            if (statusRef.current === 'draft') {
                setStatus('battle');
            }
        };

        socket.on('room-state', onRoomState);
        socket.on('room-ready', onRoomReady);
        socket.on('player-left', onPlayerLeft);

        const join = () => {
            setStatus('joining');
            setError(null);

            if (!socket.connected) socket.connect();

            socket.emit('join-room', {token, username: user?.username, id: user?.id}, (ack) => {
                if (isCancelled) return;

                if (!ack?.ok) {
                    setError(ack?.error ?? 'join_failed');
                    setStatus('error');
                    return;
                }

                setRole(ack.role ?? null);
                setPlayers(ack.players ?? null);
                if (ack?.usernames) setUsernames(ack.usernames);
                if(ack?.ranks) setRanks(ack.ranks);
                if (ack?.type) {
                    roomTypeRef.current = ack.type;
                    setRoomType(ack.type);
                }
                if (ack.players === 2 && ack?.type === "play") {
                    setStatus("battle");
                    return;
                }
                if (ack.players === 2) startDraftDelayed();
            });
        };

        join();

        return () => {
            isCancelled = true;
            socket.off('room-state', onRoomState);
            socket.off('room-ready', onRoomReady);
            socket.off('player-left', onPlayerLeft);
            if (draftTimerRef.current != null) {
                clearTimeout(draftTimerRef.current);
                draftTimerRef.current = null;
            }
        };
    }, [token]);

    // Important: if the user navigates away (browser back button, route change),
    // explicitly leave the room + disconnect the socket so the server frees the slot.
    useEffect(() => {
        // Cancel any scheduled leave (React StrictMode mounts/unmounts effects in dev).
        if (leaveTimerRef.current != null) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
        }

        const doLeaveNow = () => {
            try {
                if (socket.connected) {
                    socket.emit('leave-room', {token, id: user?.id});
                }
            } catch {
                // ignore
            }

            try {
                socket.disconnect();
            } catch {
                // ignore
            }
        };

        const scheduleLeave = () => {
            if (leaveTimerRef.current != null) return;
            // Small delay prevents React StrictMode "fake unmount" from instantly leaving.
            leaveTimerRef.current = setTimeout(() => {
                leaveTimerRef.current = null;
                doLeaveNow();
            }, 50);
        };

        // pagehide triggers on back/forward cache and tab close in many browsers.
        // popstate covers browser back/forward within SPA history.
        // beforeunload is a fallback for full-page navigations.
        window.addEventListener('pagehide', doLeaveNow);
        window.addEventListener('popstate', doLeaveNow);
        window.addEventListener('beforeunload', doLeaveNow);

        return () => {
            window.removeEventListener('pagehide', doLeaveNow);
            window.removeEventListener('popstate', doLeaveNow);
            window.removeEventListener('beforeunload', doLeaveNow);
            scheduleLeave();
        };
    }, [token]);

    const handleLeave = () => {
        if (!socket.connected) {
            navigate('/');
            return;
        }

        socket.emit('leave-room', token, () => {
            socket.disconnect();
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
        <div className="screen flex justify-center items-center overflow-hidden">
            {status === "joining"
                ? <WaitingScreen role={role} players={players} usernames={usernames} ranks={ranks}/>
                : status === "draft" && roomType !== "play"
                    ? <DraftScreen role={role} setStatus={setStatus}/>
                    : <BattleScreen token={token} role={role} usernames={usernames} ranks={ranks}/>}
        </div>
    );
};

export default RoomScreen;
