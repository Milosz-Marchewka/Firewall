import { useEffect } from "react";
import SkillTreeAbility from "./SkillTreeAbility";
import "./SkillTreeScreen.css";

const SkillTreeScreen = ({abilities, isShowed, setIsShowed}) => {

    useEffect(()=>{
        console.log(isShowed);
        console.log(setIsShowed);
    },[isShowed]);

    const handleClick = () => {
        console
        setIsShowed(prev => false);
    }

    return(
        <div className={`screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-sky-500 to-gray-900 z-1000 transition-[left] duration-500 ${isShowed ? "left-0" : "-left-full"}`}>
            <div className="absolute text-4xl left-5 top-5 pointer" onClick={() => {handleClick()}}>◀️</div>
            <h1 className="font-jersey text-7xl text-center text-white text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)]">CYBERSECURITY SPECIALIST'S SKILL TREE</h1>
            <div className="bg-neutral-900 w-3/4 mx-auto p-1 border border-gray-600">
                <table className="font-jersey text-white mx-auto border-separate border-spacing-1 w-full">
                    <tr className="text-2xl">
                        <th></th>
                        <th>Identity & Access</th>
                        <th>Application security</th>
                        <th>Infrastructure</th>
                        <th>SOC & Monitoring</th>
                    </tr>
                    {
                        [...Array(6)].map((_, index)=>{
                            return(
                                <tr className={`${"skilltree-rarity-"+(index+1)} h-30 min-h-fit`}>
                                    <td>Tier {index+1}</td>
                                    <td>
                                        {
                                            abilities.map((item, i)=>{
                                                if(item.category == "Identity & Access" && item.rarity == index+1)
                                                    return <SkillTreeAbility data={item}/>
                                            })
                                        }
                                    </td>
                                    <td>
                                        {
                                            abilities.map((item, i)=>{
                                                if(item.category == "Application security" && item.rarity == index+1)
                                                    return <SkillTreeAbility data={item}/>
                                            })
                                        }
                                    </td>
                                    <td>
                                        {
                                            abilities.map((item, i)=>{
                                                if(item.category == "Infrastructure" && item.rarity == index+1)
                                                    return <SkillTreeAbility data={item}/>
                                            })
                                        }
                                    </td>
                                    <td>
                                        {
                                            abilities.map((item, i)=>{
                                                if(item.category == "SOC & Monitoring" && item.rarity == index+1)
                                                    return <SkillTreeAbility data={item}/>
                                            })
                                        }
                                    </td>
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