const Level = ({level = 0, currentXp = 0})=>{
    const ceilXp = Math.ceil(1.25*(level));
    return(
        <div className="relative w-3/4 h-10 bg-transparent border-4 px-5 border-gray-500 text-white flex justify-between items-center font-jersey text-2xl shadow-[2px_2px_0px_rgb(0_0_0)] text-shadow-[1px_1px_0px_rgb(0_0_0)]">
            <div className={`absolute left-0 h-full w-[${currentXp/ceilXp*100}%] bg-amber-300/90`} style={{width: `${currentXp/ceilXp*100}%`, zIndex:"1"}}></div>
            <p className="z-2">Level {level}</p>
            <p className="z-2">{currentXp}/{ceilXp}xp</p>
        </div>
    )
}

export default Level;