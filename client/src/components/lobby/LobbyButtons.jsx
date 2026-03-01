import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterContext } from "./LobbyScreen";
import { extractToken } from "../../utils/utils";
import { socket } from "../../socket";
import "./CharacterSwitch.css";

const LobbyButtons = ({username, id, onLogout, characterSelected, deck}) => {

    const [char, charSelected] = useContext(CharacterContext);
    const attackerRef = useRef(null);
    const deffenderRef = useRef(null);
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isDeckFilled, setIsDeckFilled] = useState(false);

    useEffect(()=>{
        if(deck.some(ability => ability === null)) setIsDeckFilled(false);
        else setIsDeckFilled(true);
    }, [...deck]);

    const handlePlay = async (type)=>{
        if (isJoining) return;
        setIsJoining(true);
        setError(null);
        try {
            if (!socket.connected) socket.connect();

            const tryJoin = async () => {
                const response = await fetch(`/api/play`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type, play: type === 'play' ? {
                            abilities: deck,
                            character: characterSelected,
                            id: id
                        } : undefined })
                });

                if (!response.ok) {
                    throw new Error('Failed to create/find room');
                }

                const data = await response.json();
                const roomUrl = data?.roomUrl;
                if (!roomUrl) throw new Error('Server did not return roomUrl');

                const token = extractToken(roomUrl);
                if (!token) throw new Error('Invalid roomUrl');

                const payload = {token, username, id, type};

                const ack = await new Promise((resolve) => {
                    socket.emit('join-room', payload, resolve);
                });

                return { token, ack };
            }

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
            setError(err?.message ?? 'play_failed');
            setIsJoining(false);
        }
    };

    return(
        <div className="grid grid-cols-3 text-center font-jersey text-white w-full self-end gap-5">
            <div onClick={isOptionsVisible ? ()=>{} : ()=>setIsOptionsVisible(true)} className="bg-neutral-600 text-6xl py-5 flex items-center justify-center border-6 border-black/80
            hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_rgb(0_0_0)] transition-all hover:bg-neutral-500 hoverable unselectable relative">
                {
                    isOptionsVisible ?
                    <div onMouseLeave={()=>{setIsOptionsVisible(false)}} className="absolute bg-neutral-500 w-[105%] h-fit -bottom-2 -left-2 shadow-[8px_8px_0px_rgb(0_0_0)] border-6 border-black/80 text-shadow-[3px_3px_0px_rgb(0_0_0)]">
                        <div
                            className="text-4xl py-2 border-b-4 border-neutral-900 hover:bg-neutral-400 transition-all"
                            onClick={() => {
                                setIsOptionsVisible(false);
                                navigate('/documentation');
                            }}
                        >
                            Documentation
                        </div>
                        <div className="text-4xl py-2 border-b-4 border-neutral-900 text-red-200 hover:bg-neutral-400 transition-all" onClick={onLogout}>Log out</div>
                        <div className="text-4xl py-2 border-b-4 border-neutral-900 hover:bg-neutral-400 transition-all" onClick={()=>{setIsOptionsVisible(false)}}>Close</div>
                    </div>
                    :
                    <></>
                }
                <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">OPTIONS</h2>
            </div>
            <div onClick={()=>handlePlay('quickplay')} className="bg-gray-500 text-6xl py-5 flex items-center justify-center border-6 border-black/80
            hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_rgb(0_0_0)] transition-all hover:bg-gray-400 hoverable unselectable">
                <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">QUICK MATCH</h2>
            </div>
            {
                isDeckFilled ?
                <div onClick={()=>handlePlay('play')} className="bg-amber-400 text-6xl py-5 flex items-center justify-center border-6 border-black/80
                hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_rgb(0_0_0)] transition-all hover:bg-amber-300 hoverable unselectable">
                    <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">PLAY</h2>
                </div>
                :
                <div className="bg-neutral-700 text-6xl py-5 flex items-center justify-center border-6 border-black/80
                text-gray-400 relative">
                    <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">PLAY</h2>
                    <h3 className="absolute text-xl z-101 bottom-0 text-shadow-[1px_1px_0px_rgb(0_0_0)]">Deck is not filled</h3>
                </div>
            }
        </div>
    );
}

export default LobbyButtons;