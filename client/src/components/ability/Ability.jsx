import "./Ability.css";
import {useDraggable} from '@dnd-kit/core';
import { abilityImages } from "../../utils/images";

const Ability = ({data = null, unlocked = true, type = "damage", overflow, ...props}) => {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: data?.code,
    });
    
    return(
        <>
            {
                data !== null ?
                <div className={`ability flex h-32 w-full text-white font-jersey pr-1 pl-2 rarity-${data?.rarity?.toFixed(0)} hover:z-300 unselectable hover:-translate-1 hover:shadow-[4px_4px_0px_rgb(0_0_0_/_0.4)] border border-black/40 transition-all`} {...props}
                ref={setNodeRef} {...listeners} {...attributes}>
                    <div className="flex-1 flex items-center justify-center">
                        <img src={abilityImages[data?.code]} alt="photo" className="w-32 pixelart"/>
                    </div>
                    <div className="flex-2 py-2 flex flex-col">
                        <h2 className="text-[24px] leading-5 text-center pl-3 text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.7)]">{data?.name}</h2>
                        <div className="flex align-middle w-full items-center flex-1 max-w-40 mx-auto pl-3">
                            <div className="flex flex-1 justify-center items-center">
                                <img src={abilityImages[data.effect.kind]} alt={data.effect.kind} className=" pixelart w-[40px]"/>
                                <div className="text-left text-3xl w-fit text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.7)]">
                                    {overflow > 0 && data.effect.kind == "damage" ?
                                    <span className="text-red-400">{data?.effect?.value + overflow}</span>
                                    :
                                    <span>{data?.effect?.value}</span>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-1 justify-center">
                                <img src={abilityImages["cooldown"]} alt="cooldown" className="pixelart w-[40px]"/>
                                <div className="text-left text-3xl w-fit text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.7)]">
                                    {data?.cooldown}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="flex w-full text-white font-jersey pr-1 pl-2 rounded-sm shadow-[3px_3px_0px_rgb(0_0_0_/_0.4)] bg-black/20 border-5 border-white/40 border-dashed">
                    <div className="w-full min-w-32 h-32 flex items-center justify-center">
                        <h2 className="text-2xl text-white/40">Empty</h2>
                    </div>
                </div>


            }
        </>

    );
}

export default Ability;
