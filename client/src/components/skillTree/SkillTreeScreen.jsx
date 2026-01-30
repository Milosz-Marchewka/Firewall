import { useEffect, useState } from "react";
import SkillTreeAbility from "./SkillTreeAbility";
import back from '../../assets/back.png';
import "./SkillTreeScreen.css";

const categories = {
    defender: ["Identity & Access", "Application security", "Infrastructure", "SOC & Monitoring"],
    attacker: ["Credentials & Identity", "Exploits & Persistence", "Network & System", "Recon & Supply chain"]
}

const SkillTreeScreen = ({role, abilities, ownedAbilities, isShowed, setIsShowed, setOwned}) => {
    const [styles, setStyles] = useState({
        outer: {
            defender: `screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-sky-700 to-gray-900 z-1000 transition-[left] duration-500`,
            attacker: `screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-red-700 to-stone-900 z-1000 transition-[left] duration-500`
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
            <div className="absolute text-4xl left-5 top-5 pointer" onClick={() => {handleClick()}}><img src={back} alt="Back" className={`${styles.th[role]} h-20 w-20 p-3 pixelart hover:shadow-[4px_4px_0px_rgb(20,20,20)] hover:-translate-y-[4px] hover:-translate-x-[4px] transition-all hoverable`}/></div>
            <h1 className="font-jersey text-7xl text-center text-white text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)]">{role.toUpperCase()}'S SKILL TREE</h1>
            <div className="h-full overflow-auto pb-20">
                <div className="bg-neutral-900 w-4/5 mx-auto p-1 border border-gray-600">
                    <table className="font-jersey text-white mx-auto border-separate border-spacing-1 w-full">
                        <thead>
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
                        </thead>
                        <tbody>
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
                                                                return <SkillTreeAbility data={item} owned={ownedAbilities.filter((value, _) => (item.code == value.code)).length > 0} onClick={() => setOwned((prev)=>[...prev, item])}/>
                                                        })
                                                    }
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SkillTreeScreen;