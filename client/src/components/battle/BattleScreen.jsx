import { useEffect, useMemo, useState } from 'react';
import Ability from '../ability/Ability.jsx';
import { socket } from '../../socket.js';
import DeckBattle from './DeckBattle.jsx';
import BattleCharacter from './BattleCharacter.jsx';
import Character from '../lobby/Character.jsx';

const BattleScreen = ({ token, role }) => {
    const [state, setState] = useState(null);
    const [error, setError] = useState(null);
    const [actionError, setActionError] = useState(null);

    const myTurn = state?.currentTurn === role;

    const myAbilities = useMemo(() => {
        if (!state || !role) return [];
        return role === 'attacker' ? (state.attacker?.abilities ?? []) : (state.defender?.abilities ?? []);
    }, [state, role]);

    useEffect(() => {
        let cancelled = false;

        const onBattleState = (payload) => {
            if (cancelled) return;
            setState(payload);
        };

        socket.on('battle-state', onBattleState);

        if (!socket.connected) socket.connect();
        socket.emit('battle-get', null, (ack) => {
            if (cancelled) return;
            if (!ack?.ok) {
                setError(ack?.error ?? 'battle_get_failed');
                return;
            }
            setState(ack.state);
        });

        return () => {
            cancelled = true;
            socket.off('battle-state', onBattleState);
        };
    }, []);

    const handleUse = async (code) => {
        setActionError(null);

        if (!socket.connected) socket.connect();
        socket.emit('battle-use', { code }, (ack) => {
            if (!ack?.ok) {
                setActionError(ack?.error ?? 'battle_use_failed');
                if (ack?.state) setState(ack.state);
                return;
            }
            if (ack?.state) setState(ack.state);
        });
    };

    if (error) {
        return <div>Battle error: {String(error)}</div>;
    }

    if (!state) {
        return <div>Loading battle…</div>;
    }

    return (
        <div className={`screen relative text-black ${role=="defender" ? "gradient-background" : "gradient-background-mirrored"}`}>
            {state.finished ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-100">
                    <div className="bg-black/70 text-white px-6 py-4 rounded text-2xl">
                        Winner: {String(state.winner)}
                    </div>
                </div>
            ) : null}
            <div className='fixed z-1000'>
                <div>Room: {token}</div>
                <div>Turn: {state.turnNumber}</div>
                <div>Current turn: {state.currentTurn}</div>
                <div>You: {role ?? '—'} {myTurn ? '(your turn)' : ''}</div>
                <div>Attacker HP: {state.attacker?.hp}</div>
                <div>Defender HP: {state.defender?.hp}</div>
                <div>Attacker overflow (next dmg bonus): {state.attacker?.overflow ?? 0}</div>
                <div>Skip turns (attacker/defender): {state.attacker?.skipTurns}/{state.defender?.skipTurns}</div>
                {actionError ? <div>Action error: {String(actionError)}</div> : null}
            </div>
            <div className="w-full h-full relative">
                <Character role={role} className={"w-2/3 -left-30 mirrored -top-20"}/>
                <BattleCharacter username={"Stefan"} rank={"Noob"} hp={role == "attacker" ? state.defender?.hp : state.attacker?.hp} role={role == "attacker" ? "defender" : "attacker"} className={"w-1/3 right-0"}/>
            </div>
            <DeckBattle role={role} abilities={myAbilities} myTurn={myTurn} state={state} handleUse={handleUse} username={"Kratos"} rank={"Pro"} hp={state[role]?.hp} overflow={role == "attacker" ? state.attacker?.overflow ?? 0 : 0}/>
            <div className="absolute top-0 right-1/2 bg-neutral-700 font-jersey text-white text-center translate-x-[50%] shadow-[10px_10px_0px_rgb(0_0_0_/_0.4)] w-1/3">
                <h2 className='text-7xl border-b-5 border-black/50 text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.7)]'>
                    Turn {state.turnNumber}
                </h2>
                <h3 className={`text-3xl ${state.currentTurn == "attacker" ? "bg-red-600" : "bg-sky-600"} text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.7)]`}>Current turn: {state.currentTurn} {myTurn ? '(your turn)' : ''} </h3>
            </div>
            <div className="absolute top-0 left-0 font-jersey text-white bg-red-700 text-4xl px-5 flex items-center justify-center border-4 border-black/80
            hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_rgb(0_0_0)] transition-all hover:bg-red-600 hoverable unselectable m-5">
                <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">&lt; Give up</h2>
            </div>
            <div className={`absolute bottom-0 right-0 bg-neutral-600 font-jersey text-white m-12 border-5 border-neutral-800 shadow-[5px_5px_0px_rgb(0_0_0)] pointer-events-none`}>
                <h2 className='text-4xl text-shadow-[3px_3px_0px_rgb(0_0_0)] p-4 bg-neutral-700 border-b-7 border-neutral-800'>Last used opponent's ability</h2>
                <Ability data={  {
                    role: "defender",
                    category: "Infrastructure",
                    code: "transport_layer_security_handling",
                    name: "TLS handling",
                    description: "Properly implementing TLS for data in transit.",
                    cooldown: 2,
                    rarity: 2,
                    effect: { kind: "heal", value: 1 }
                }}/>
            </div>
        </div>
    );
};

export default BattleScreen;