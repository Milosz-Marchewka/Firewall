import { useEffect, useMemo, useState } from "react";
import { getRandomItems } from "../../utils/utils";
import Ability from "../ability/Ability";
import { socket } from "../../socket";

const DraftScreen = ({role, setStatus})=>{

    const [abilities, setAbilities] = useState([]);
    const [current, setCurrent] = useState([]);
    const [picked, setPicked] = useState([]);
    const [meDone, setMeDone] = useState(false);
    const [otherDone, setOtherDone] = useState(false);

    const pickedCodes = useMemo(() => new Set(picked.map((a) => a.code)), [picked]);

    const rollOptions = (pool, alreadyPickedCodes, count = 2) => {
        const available = pool.filter((ability) => !alreadyPickedCodes.has(ability.code));
        return getRandomItems(available, count);
    };

    useEffect(()=>{
        if (!role) return;

        let cancelled = false;
        (async()=>{
            try{
                const req = await fetch(`/api/abilities?role=${role}`, {
                    method: "GET",
                });

                if(!req.ok){
                    return;
                }
                const data = await req.json();
                if (cancelled) return;

                setAbilities([...data]);
                setPicked([]);
                setCurrent(getRandomItems(data, 2));
            } catch(e){
                //
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [role]);

    useEffect(() => {
        if (!role) return;

        const applyStatus = (payload) => {
            const attackerDone = !!payload?.attackerDone;
            const defenderDone = !!payload?.defenderDone;
            const other = role === 'attacker' ? defenderDone : attackerDone;
            setOtherDone(other);

            if (attackerDone && defenderDone) {
                setStatus('ready');
            }
        };

        const onDraftStatus = (payload) => applyStatus(payload);
        const onDraftComplete = () => setStatus('ready');

        socket.on('draft-status', onDraftStatus);
        socket.on('draft-complete', onDraftComplete);

        // Initialize otherDone by asking the server.
        if (!socket.connected) socket.connect();
        socket.emit('draft-get', null, (ack) => {
            if (ack?.ok) applyStatus(ack);
        });

        return () => {
            socket.off('draft-status', onDraftStatus);
            socket.off('draft-complete', onDraftComplete);
        };
    }, [role, setStatus]);

    const handlePicked = (ability)=>{
        if (meDone) return;

        if (!socket.connected) socket.connect();
        socket.emit('draft-pick', { code: ability.code });

        setPicked((prev) => {
            const nextPicked = [...prev, ability];
            const nextCodes = new Set(nextPicked.map((a) => a.code));

            if (nextPicked.length >= 4) {
                setMeDone(true);
                if (!socket.connected) socket.connect();
                socket.emit('draft-done', null, (ack) => {
                    if (ack?.ok) {
                        const other = role === 'attacker' ? !!ack.defenderDone : !!ack.attackerDone;
                        setOtherDone(other);
                        if (ack.bothDone) setStatus('ready');
                    }
                });
            } else {
                setCurrent(rollOptions(abilities, nextCodes, 2));
            }

            return nextPicked;
        });
    }

// on select: if user has less than 4 abilities, refresh
// else proceed to battle screen
    return(
        <div>
            {!role ? <div>Loading…</div> : null}
            {meDone && !otherDone ? <div>Other person still choosing…</div> : null}
            {!meDone && current.map((ability, index)=>
                <Ability key={ability.code ?? index} data={ability} unlocked={true} onClick={()=>handlePicked(ability)}/>
            )}
        </div>
    )
}

export default DraftScreen;