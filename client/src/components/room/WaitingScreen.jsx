import Spinner from "../../utils/Spinner";
import Character from "../lobby/Character";

const WaitingScreen = ({role, players, usernames, ranks}) =>{
    console.log("USERNAMES:", usernames);

    const defenderName = usernames?.defender || (players < 2 && role !== 'defender' ? '' : 'Defender');
    const attackerName = usernames?.attacker || (players < 2 && role !== 'attacker' ? '' : 'Attacker');
    const defenderRank = ranks?.defender || "Error";
    const attackerRank = ranks?.attacker || "Error";
    
    return(
        <div className="w-screen h-screen flex mx-auto overflow-hidden text-white relative gradient-background">
            <div className="absolute top-0 left-[50%] -translate-x-[50%] font-jersey text-center mt-5 w-130">
                <h2 className="w-full bg-neutral-500 text-7xl text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.9)] shadow-[5px_5px_0px_rgb(0_0_0_/_0.9)] px-5 py-2 border-b-5 border-black/50">Quick Match</h2>
                <h3 className={`w-full ${ players < 2 ? 'bg-neutral-800' : 'bg-orange-400'} text-5xl px-10 py-2 text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.9)] shadow-[5px_5px_0px_rgb(0_0_0_/_0.9)]`}>                    
                    { players < 2 ? <span>Waiting for player<span className="dots-loading"></span></span> : 'The game is starting'}
                </h3>
            </div>
            <div className="w-1/2 h-full p-10 pt-7 flex flex-col gap-5 items-start justify-end overflow-hidden">
            <div className="mb-auto font-jersey">
                <h3 className="text-6xl z-3 bg-neutral-900 px-10 py-2 text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.9)] shadow-[5px_5px_0px_rgb(0_0_0_/_0.9)] mb-auto">{role !== 'defender' && players < 2 ? <span className="dots-loading"></span> : defenderName}</h3>
                {role !== 'defender' && players < 2 ? <></> : <h3 className="text-black px-5 py-1 bg-amber-300 text-4xl w-fit shadow-[5px_5px_0px_rgb(0_0_0_/_0.9)]">{defenderRank}</h3>}
            </div>
                { role !== 'defender' && players < 2 ? <Character role={'defender'} className={"w-full right-[20%] top-[-15%] z-1 fade-left-light brightness-0 mirrored"}/> : <Character role={'defender'} className={"w-full right-[20%] top-[-15%] mirrored z-1 fade-left-light"}/> }
                <h3 className="text-6xl font-jersey z-3 bg-sky-500 px-10 py-2 text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.9)] shadow-[5px_5px_0px_rgb(0_0_0_/_0.9)]">Defender{role === "defender" ? " (you)" : ""}</h3>
            </div>
            <p className="absolute left-[50%] top-[50%] translate-x-[-52.5%] translate-y-[-50%] text-[300px] text-shadow-[10px_10px_0px_rgb(0_0_0_/_0.9)] font-jersey text-white">V<span className="relative left-2 top-10 text-white">S</span></p>
            <div className="w-1/2 h-full p-10 pt-7 flex flex-col gap-5 items-end justify-end overflow-hidden">
                <div className="mb-auto font-jersey">
                    <h3 className="text-6xl z-3 bg-neutral-900 px-10 py-2 text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.9)] shadow-[5px_5px_0px_rgb(0_0_0_/_0.9)] mb-auto">{role !== 'attacker' && players < 2 ? <span className="dots-loading"></span> : attackerName}</h3>
                    {role !== 'attacker' && players < 2 ? <></> : <h3 className="text-black px-5 py-1 bg-amber-300 text-4xl w-fit shadow-[5px_5px_0px_rgb(0_0_0_/_0.9)] ml-auto">{attackerRank}</h3>}
                </div>
                { role !== 'attacker' && players < 2 ? <Character role={'attacker'} className={"w-full right-[-20%] top-[-15%] z-1 fade-left-light brightness-0"}/> : <Character role={'attacker'} className={"w-full right-[-20%] top-[-15%] z-1 fade-left-light"}/> }
                <h3 className="text-6xl font-jersey z-3 bg-red-500 px-10 py-2 text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.9)] shadow-[5px_5px_0px_rgb(0_0_0_/_0.9)]">Attacker{role === "attacker" ? " (you)" : ""}</h3>
            </div>
        </div>
    )
}

export default WaitingScreen;