import { useEffect, useState } from "react";
import SkillTreeAbility from "./SkillTreeAbility";
import back from '../../assets/back.png';
import "./SkillTreeScreen.css";

const categories = {
    defender: ["Identity & Access", "Application security", "Infrastructure", "SOC & Monitoring"],
    attacker: ["Credentials & Identity", "Exploits & Persistence", "Network & System", "Recon & Supply chain"]
}

const SkillTreeScreen = ({role, abilities, ownedAbilities, isShowed, setIsShowed}) => {
    const [styles, setStyles] = useState({
        outer: {
            defender: `screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-sky-500 to-gray-900 z-1000 transition-[left] duration-500`,
            attacker: `screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-red-500 to-stone-900 z-1000 transition-[left] duration-500`
        },
        th: {
            defender: "bg-sky-600",
            attacker: "bg-red-600"
        }
    })

    const handleClick = () => {
        setIsShowed(prev => false);
    }

    return(
        <div className={styles.outer[role]} style={{left: isShowed ? "0" : "-100%"}}>
            <div className="absolute text-4xl left-5 top-5 pointer" onClick={() => {handleClick()}}><img src={back} alt="Back" className={`${styles.th[role]} h-20 w-20 p-3 pixelart hover:shadow-[8px_8px_0px_rgb(45,45,45)] hover:-translate-y-2 hover:translate-x-2 hoverable`}/></div>
            <h1 className="font-jersey text-7xl text-center text-white text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)]">{role.toUpperCase()}'S SKILL TREE</h1>
            <div className="bg-neutral-900 w-4/5 mx-auto p-1 border border-gray-600">
                <table className="font-jersey text-white mx-auto border-separate border-spacing-1 w-full">
                    <tr className="text-2xl">
                        <th></th>
                        <>
                            {
                                categories[role].map((category)=>
                                    <th className={`${styles.th[role]} font-normal px-10 py-3`}>{category}</th>
                                )
                            }
                        </>
                    </tr>
                    {
                        [...Array(6)].map((_, index)=>{
                            return(
                                <tr className={`${"skilltree-rarity-"+(index+1)} h-30 min-h-fit`}>
                                    <td>Tier {index+1}</td>
                                    { categories[role].map((category)=>
                                        <td>
                                            {
                                                abilities?.map((item, i)=>{
                                                    if(item.category == category && item.rarity == index+1)
                                                        return <SkillTreeAbility data={item} owned={ownedAbilities.filter((value, _) => (item.code == value.code)).length > 0}/>
                                                })
                                            }
                                        </td>
                                    )}
                                </tr>
                            );
                        })
                    }
                </table>
            </div>
        </div>
    );
}

export default SkillTreeScreen;