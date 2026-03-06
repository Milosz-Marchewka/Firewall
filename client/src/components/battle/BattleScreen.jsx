import { useEffect, useState } from 'react';
import Ability from '../ability/Ability.jsx';
import { socket } from '../../socket.js';
import DeckBattle from './DeckBattle.jsx';
import BattleCharacter from './BattleCharacter.jsx';
import Character from '../lobby/Character.jsx';
import EndScreen from './EndScreen.jsx';

const BattleScreen = ({ token, role, usernames, ranks}) => {
    
    const [state, setState] = useState(null);
    const [error, setError] = useState(null);
    const [actionError, setActionError] = useState(null);
    const [myAbilities, setMyAbilities] = useState([]);
    const [opponentAbilities, setOpponentAbilities] = useState([]);

    const myTurn = state?.currentTurn === role;

    const syncAbilities = (nextState, nextRole) => {
        if (!nextState || !nextRole) return;
        const opponentRole = nextRole === 'attacker' ? 'defender' : 'attacker';
        setMyAbilities(nextState?.[nextRole]?.abilities ?? []);
        setOpponentAbilities(nextState?.[opponentRole]?.abilities ?? []);
    };

    useEffect(() => {
        let cancelled = false;
        
        const onBattleState = (payload) => {
            if (cancelled) return;
            
            setState(payload);
            syncAbilities(payload, role);
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
            syncAbilities(ack.state, role);
        });

        return () => {
            cancelled = true;
            socket.off('battle-state', onBattleState);
        };
    }, []);

    useEffect(() => {
        syncAbilities(state, role);
    }, [state, role]);

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

    const handleGiveUp = () => {
        setActionError(null);
        if (!socket.connected) socket.connect();
        socket.emit('battle-giveup', null, (ack) => {
            if (!ack?.ok) {
                setActionError(ack?.error ?? 'battle_giveup_failed');
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

    const myName = usernames?.[role] || (role === 'attacker' ? 'Attacker' : 'Defender');
    const opponentRole = role === 'attacker' ? 'defender' : 'attacker';
    const opponentName = usernames?.[opponentRole] || (opponentRole === 'attacker' ? 'Attacker' : 'Defender');

    const lastOpponentEntry = (state.log ?? []).slice().reverse().find((entry) => {
        return entry?.player === opponentRole && entry?.action?.type === 'ability';
    });
    const lastOpponentAbilityCode = lastOpponentEntry?.action?.ability ?? null;
    const lastOpponentAbility = lastOpponentAbilityCode
        ? opponentAbilities.find((ability) => ability.code === lastOpponentAbilityCode)
        : null;
    const lastOpponentAbilityName = lastOpponentEntry?.action?.abilityName
        ?? lastOpponentAbility?.name
        ?? lastOpponentAbilityCode
        ?? '—';
    const lastOpponentAbilityData = lastOpponentAbility ?? (lastOpponentAbilityCode ? {
        code: lastOpponentAbilityCode,
        name: lastOpponentAbilityName,
        description: '',
        cooldown: 0,
        currentCooldown: 0,
        rarity: 1,
        effect: lastOpponentEntry?.action?.effect ?? { kind: 'damage', value: 0 },
    } : null);

    return (
        <div className={`screen relative text-black ${role=="defender" ? "gradient-background" : "gradient-background-mirrored"}`}>
            {state.finished ? (
                <EndScreen result={{
                    message: state.winner === role ? "won" : "lost",
                    timeElapsed: state.timeElapsed,
                    numberOfTurns: state.turnNumber,
                    gainedXP: state.rewards?.[role]?.xp ?? 0,
                    gainedSkillPoints: state.rewards?.[role]?.points ?? 0,
                }}/>
            ) : null}
            <div className="w-full h-full relative">
                <Character role={role} className={"w-2/3 -left-30 mirrored -top-20"}/>
                <BattleCharacter username={opponentName} rank={role === 'attacker' ? ranks.defender : ranks.attacker} hp={role === "attacker" ? state.defender?.hp : state.attacker?.hp} role={role === "attacker" ? "defender" : "attacker"} className={"w-1/3 right-0"}/>
            </div>
            <DeckBattle role={role} abilities={myAbilities} myTurn={myTurn} state={state} handleUse={handleUse} username={myName} rank={ranks[role]} hp={state[role]?.hp} overflow={role == "attacker" ? state.attacker?.overflow ?? 0 : 0}/>
            <div className="absolute top-0 right-1/2 bg-neutral-700 font-jersey text-white text-center translate-x-[50%] shadow-[10px_10px_0px_rgb(0_0_0_/_0.4)] w-1/3">
                <h2 className='text-7xl border-b-5 border-black/50 text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.7)]'>
                    Turn {state.turnNumber}
                </h2>
                <h3 className={`text-3xl ${state.currentTurn == "attacker" ? "bg-red-600" : "bg-sky-600"} text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.7)]`}>Current turn: {state.currentTurn} {myTurn ? '(your turn)' : ''} </h3>
            </div>
            <div className="absolute top-0 left-0 font-jersey text-white bg-red-700 text-4xl px-5 flex items-center justify-center border-4 border-black/80
            hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_rgb(0_0_0)] transition-all hover:bg-red-600 hoverable unselectable m-5"
            onClick={handleGiveUp} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGiveUp(); }}>
                <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">&lt; Give up</h2>
            </div>
            <div className={`absolute bottom-0 right-0 bg-neutral-600 font-jersey text-white m-12 border-5 border-neutral-800 shadow-[5px_5px_0px_rgb(0_0_0)] pointer-events-none`}>
                <h2 className='text-4xl text-shadow-[3px_3px_0px_rgb(0_0_0)] p-4 bg-neutral-700 border-b-7 border-neutral-800'>Opponent used {lastOpponentAbilityName}!</h2>
                {lastOpponentAbilityData ? <Ability data={lastOpponentAbilityData} /> : null}
            </div>
        </div>
    );
};

export default BattleScreen;