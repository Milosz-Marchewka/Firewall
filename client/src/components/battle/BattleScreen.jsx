import { useEffect, useMemo, useState } from 'react';
import Ability from '../ability/Ability.jsx';
import { socket } from '../../socket.js';

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
        <div className="w-full max-w-5xl relative">
            {state.finished ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/70 text-white px-6 py-4 rounded text-2xl">
                        Winner: {String(state.winner)}
                    </div>
                </div>
            ) : null}
            <div>
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

            <div className="mt-4 grid gap-3">
                {myAbilities.map((ability) => {
                    const canUse = myTurn && (ability.currentCooldown ?? 0) === 0 && !state.finished;

                    return (
                        <div key={ability.code} style={{ opacity: canUse ? 1 : 0.5 }}>
                            <Ability
                                data={ability}
                                unlocked={canUse}
                                onClick={() => {
                                    if (!canUse) return;
                                    handleUse(ability.code);
                                }}
                            />
                            {(ability.currentCooldown ?? 0) > 0 ? <div>Cooldown: {ability.currentCooldown}</div> : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BattleScreen;