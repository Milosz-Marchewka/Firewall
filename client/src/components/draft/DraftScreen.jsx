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
        <div className={`screen flex flex-col items-center justify-center gap-5 gradient-background-${role}`}>
            <div className="text-center">
                <h1 className="font-jersey text-white text-8xl">DRAFT</h1>
                <h3 className={`text-${role == "attacker" ? "red" : "sky"}-200 font-jersey text-4xl`}>Choose your ability:</h3>
            </div>
            <div className={`w-1/2 h-50 flex justify-center items-center px-10 gap-10 border-3 ${role == "attacker" ? "border-red-600" : "border-sky-600"} rounded-2xl ${role == "attacker" ? "bg-red-400/10" : "bg-sky-400/10"}`}>
                {!role ? <div>Loading…</div> : null}
                {meDone && !otherDone ? <div className="font-jersey text-white/80 text-4xl text-center w-full">Other person still choosing…</div> : null}
                {!meDone && current.map((ability, index)=>
                    <Ability key={ability.code ?? index} data={ability} unlocked={true} onClick={()=>handlePicked(ability)}/>
                )}
            </div>
            <div className="flex text-white font-jersey gap-10 text-[40px]">
                <div className={`w-8 h-8 bg-${picked.length >= 1 ? "white" : "neutral-800"} shadow-[6px_6px_0px_rgb(0_0_0)]`}></div>
                <div className={`w-8 h-8 bg-${picked.length >= 2 ? "white" : "neutral-800"} shadow-[6px_6px_0px_rgb(0_0_0)]`}></div>
                <div className={`w-8 h-8 bg-${picked.length >= 3 ? "white" : "neutral-800"} shadow-[6px_6px_0px_rgb(0_0_0)]`}></div>
                <div className={`w-8 h-8 bg-${picked.length >= 4 ? "white" : "neutral-800"} shadow-[6px_6px_0px_rgb(0_0_0)]`}></div>
            </div>
        </div>
    )
}

export default DraftScreen;