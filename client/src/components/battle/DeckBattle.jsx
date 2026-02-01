import Ability from "../ability/Ability";

const DeckBattle = ({role, abilities, myTurn, state, handleUse, username, rank, hp, overflow}) => {


    return (
        <div className={`fixed bottom-0 left-0 w-2/3`}>
            <div className='w-2/3 text-white font-jersey p-2'>
                <div className='flex items-end'>
                        <h2 className='text-4xl bg-neutral-900 w-fit px-5 shadow-[5px_5px_0px_rgb(0_0_0_/_0.7)] text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.7)]'>{username}</h2>
                        <h3 className='text-2xl bg-amber-600 px-5 h-fit shadow-[5px_5px_0px_rgb(0_0_0_/_0.7)] text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.7)]'>{rank}</h3>
                    </div>
                <div className='bg-neutral-950 w-full p-4 shadow-[5px_5px_0px_rgb(0_0_0_/_0.7)]'>
                    <div className='w-full bg-neutral-900 overflow-hidden relative'>
                        <div className={`bg-amber-300 h-9`} style={{width: hp/20*100 + "%"}}></div>
                        <div className="absolute h-full w-full top-0 uppercase text-nowrap z-11 text-3xl text-black pl-2">{role == "attacker" ? "persistance" : "integrity"} {hp}/20</div>
                        <div className="absolute h-full w-full bg-amber-600 top-0 z-10" style={hp>20 ? {width: (hp-20)/20*100 + "%"} : {width: "0px"}}></div>
                    </div>
                </div>
            </div>  
            <div className="shadow-[8px_8px_0px_rgb(0_0_0_/_0.6)]">
                <h2 className={`${role == "attacker" ? "bg-red-500" : "bg-sky-500"} font-jersey text-center text-white text-5xl px-10 text-shadow-[3px_3px_0px_rgb(0_0_0_/_0.6)]`}>Your deck:</h2>
                <div className={`flex ${role == "attacker" ? "bg-red-900" : "bg-sky-900"} p-5 gap-2`}>
                    {abilities?.map((ability) => {
                        const canUse = myTurn && (ability.currentCooldown ?? 0) === 0 && !state.finished;

                        return (
                            <div key={ability.code} className="flex-1 relative">
                                <div style={ !canUse ? { opacity: 0.7, filter: "grayscale(1)", pointerEvents: "none" } : {}}>
                                    <Ability
                                        data={ability}
                                        unlocked={canUse}
                                        onClick={() => {
                                            if (!canUse) return;
                                            handleUse(ability.code);
                                        }}
                                        overflow={overflow}
                                    />    
                                </div>
                                {(ability.currentCooldown ?? 0) > 0 ? <div className="absolute bottom-0 left-[50%] -translate-x-[50%] font-jersey text-white text-2xl w-full text-center bg-neutral-700 transition-all">Cooldown: {ability.currentCooldown}</div> : null}
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );

}

export default DeckBattle;