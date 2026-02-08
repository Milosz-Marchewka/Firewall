import { abilityImages } from "../../utils/images"

const SkillTreeAbility = ({data, owned, onClick}) => {
    return(
        <div className={`ability flex h-32 w-full text-white font-jersey rounded-sm ml-1 ${owned ? data.role == "attacker" ? "bg-neutral-700/50 border-2 border-red-300" : "bg-neutral-700/50 border-2 border-sky-300" : "bg-neutral-900 border-2 border-neutral-800"} transition-all`} {...owned ? "" : onClick={onClick}}>
            <div className="flex-2 flex items-center justify-center px-2 max-w-[90px]">
                <img src={abilityImages[data?.code]} alt="photo" className="w-32 pixelart"/>
            </div>
            <div className="flex-5 py-2 flex flex-col pl-2 ">
                <h2 className="text-[24px] leading-5 text-shadow-lg text-left mb-1">{data?.name}</h2>
                <p className='flex-1 text-left leading-none'>{data?.description}</p>
            </div>
            <div className={`grid grid-cols-2 grid-row-2 text-lg pl-2 items-center abilityKind-${data.effect.kind} h-full justify-items-center ml-1 py-5`}>
                    <div>
                        {
                            <img src={abilityImages[data.effect.kind]} alt={data.effect.kind} className="ml-auto pixelart w-7.5"/>
                        }
                    </div>
                    <div className="text-left text-2xl w-full pl-1">
                        {data?.effect?.value}
                    </div>
                    <div>
                        <img src={abilityImages["freeze"]} alt="cooldown" className="ml-auto pixelart w-7.5"/>
                    </div>
                    <div className="text-left text-2xl w-full pl-1">
                        {data?.cooldown}
                </div>
            </div>
        </div>
    )
}

export default SkillTreeAbility

// level 1 = 1exp
// level n = Math.ceil(1.25(n-1))