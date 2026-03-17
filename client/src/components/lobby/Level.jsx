const Level = ({level = 0, currentXp = 0})=>{
    const ceilXp = Math.max(1, Math.ceil(1.25 * (Number(level) || 0)));
    const safeCurrentXp = Math.min(Math.max(0, Number(currentXp) || 0), ceilXp);
    return(
        <div className="relative w-3/4 h-10 bg-transparent border-4 px-5 border-gray-500 text-white flex justify-between items-center font-jersey text-2xl shadow-[2px_2px_0px_rgb(0_0_0)] text-shadow-[1px_1px_0px_rgb(0_0_0)]">
            <div className={`absolute left-0 h-full w-[${safeCurrentXp/ceilXp*100}%] bg-amber-300/90`} style={{width: `${safeCurrentXp/ceilXp*100}%`, zIndex:"1"}}></div>
            <p className="z-2">Level {level}</p>
            <p className="z-2">{safeCurrentXp}/{ceilXp}xp</p>
        </div>
    )
}

export default Level;