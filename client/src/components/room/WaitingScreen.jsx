import Spinner from "../../utils/Spinner";

const WaitingScreen = ({role, players}) =>{
    return(
        <div className="h-4/5 w-4/5 flex mx-auto rounded-4xl overflow-hidden text-white">
            <div className="w-1/2 h-full p-10 flex flex-col gap-5 items-start justify-end bg-gradient-to-l from-transparent to-blue-400">
                { role !== 'defender' && players < 2 ? <Spinner color="#38bdf8"/> : null }
                <h3 className="text-5xl font-jersey mr-auto">Defender{role === "defender" ? " (you)" : ""}</h3>
            </div>
            <p className="absolute left-[50%] top-[50%] translate-x-[-52.5%] translate-y-[-70%] text-9xl font-jersey text-purple-600">V<span className="relative left-2 top-5 text-purple-600">S</span></p>
            <div className="w-1/2 h-full p-10 flex flex-col gap-5 items-end justify-end bg-gradient-to-r from-transparent to-red-400">
                { role !== 'attacker' && players < 2 ? <Spinner color="#E53935"/> : null }
                <h3 className="text-[3.375rem] font-jersey">Attacker{role === "attacker" ? " (you)" : ""}</h3>
            </div>
        </div>
    )
}

export default WaitingScreen;