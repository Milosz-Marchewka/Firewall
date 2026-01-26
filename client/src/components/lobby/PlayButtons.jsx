import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterContext } from "./LobbyScreen";
import { extractToken } from "../../utils/utils";
import { socket } from "../../socket";
import "./CharacterSwitch.css";

const PlayButtons = () => {

    const [char, charSelected] = useContext(CharacterContext);
    const attackerRef = useRef(null);
    const deffenderRef = useRef(null);

    // useEffect(()=>{

    // },char)

    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleQuickPlay = async () => {
        if (isJoining) return;
        setIsJoining(true);
        setError(null);
        try {
            if (!socket.connected) socket.connect();

            const tryJoin = async () => {
                const response = await fetch(`/api/quickplay`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    console.log(response);
                    throw new Error('Failed to create/find room');
                }

                const data = await response.json();
                const roomUrl = data?.roomUrl;
                if (!roomUrl) throw new Error('Server did not return roomUrl');

                const token = extractToken(roomUrl);
                if (!token) throw new Error('Invalid roomUrl');

                const ack = await new Promise((resolve) => {
                    socket.emit('join-room', token, resolve);
                });

                return { token, ack };
            };

            // retry logic (sometimes rooms get full/not found/mistakenly full)
            let lastAck = null;
            for (let attempt = 0; attempt < 3; attempt += 1) {
                const { token, ack } = await tryJoin();
                lastAck = ack;

                if (ack?.ok) {
                    navigate(`/room/${token}`);
                    setIsJoining(false);
                    return;
                }

                if (!['full', 'not_found', 'finished'].includes(ack?.error)) {
                    throw new Error(ack?.error ?? 'join_failed');
                }
            }

            throw new Error(lastAck?.error ?? 'join_failed');
        } catch (err) {
            setError(err?.message ?? 'quickplay_failed');
            setIsJoining(false);
        }
    };

    return(
        <div className="grid grid-cols-2 text-center font-jersey text-white w-3/4 self-end gap-10">
            <div onClick={handleQuickPlay} className="bg-gray-500 text-6xl py-5 flex items-center justify-center border-6 border-black/80
            hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_rgb(0_0_0)] hoverable unselectable">
                <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">QUICK MATCH</h2>
            </div>
            <div className="bg-amber-400 text-6xl py-5 flex items-center justify-center border-6 border-black/80
            hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_rgb(0_0_0)] hoverable unselectable">
                <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">PLAY</h2>
            </div>
        </div>
    );
}

export default PlayButtons;