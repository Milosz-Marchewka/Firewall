import { useNavigate } from 'react-router-dom';
import Button from '../entryScreen/Button';


// result={{message: "lost", timeElapsed: 5, numberOfTurns: 20, gainedXP: 4, gainedSkillPoints: 2}}
const EndScreen = ({result})=>{

    const navigate = useNavigate();

    const formatElapsed = (value) => {
        if (typeof value === 'string') return value;
        const minutes = Number(value ?? 0);
        if (!Number.isFinite(minutes) || minutes <= 0) return "0m";
        return `${minutes}m`;
    };

    return(
        <div className="screen absolute backdrop-blur-xs top-0 left-0 flex items-center justify-center font-jersey text-white text-center z-101">
            <div className="min-w-100 bg-neutral-800 border-4 border-black p-4 popUp">
                    <h1 className={`text-8xl ${result.message === "won" ? "text-green-300" : "text-red-300"}`}>You {result.message}!</h1>
                    <div className='text-xl flex justify-around'>
                        <h3>Time elapsed: {formatElapsed(result.timeElapsed)}</h3>
                        <h3>Number of turns: {result.numberOfTurns}</h3>
                    </div>
                    <h2 className={`text-4xl mt-2 ${result.gainedXP <= 0 ? "text-neutral-400" : "text-amber-300"}`}>
                        Gained XP: {result.gainedXP}
                    </h2>
                    <h2 className={`text-3xl mt-1 ${result.gainedSkillPoints <= 0 ? "text-neutral-400" : "text-amber-300"}`}>
                        Skill points gained: {result.gainedSkillPoints}
                    </h2>
                    <Button className={"bg-neutral-500 w-3/4 mt-3"} onClick={()=>navigate("/")}>Back to lobby</Button>
            </div>
        </div>
    )
}

export default EndScreen;