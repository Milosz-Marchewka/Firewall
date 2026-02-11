import { useEffect, useState } from "react";
import SkillTreeAbility from "./SkillTreeAbility";
import back from '../../assets/oldIcons/back.png';
import "./SkillTreeScreen.css";
import Button from "../entryScreen/Button";
import { abilityImages } from "../../utils/images";

const categories = {
    defender: ["Identity & Access", "Application security", "Infrastructure", "SOC & Monitoring"],
    attacker: ["Credentials & Identity", "Exploits & Persistence", "Network & System", "Recon & Supply chain"]
}

const SkillTreeScreen = ({id, role, switchRole, abilities, ownedAbilities, isShowed, setIsShowed, setOwned, skillPoints, setSkillPoints}) => {
    const [styles, setStyles] = useState({
        outer: {
            defender: `screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-sky-700 to-gray-900 z-1000 transition-[left] duration-500 `,
            attacker: `screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-red-700 to-stone-900 z-1000 transition-[left] duration-500`
        },
        th: {
            defender: "bg-sky-600",
            attacker: "bg-red-600"
        }
    })

    const [buyingProgress, setBuyingProgress] = useState({stage: "", ability: {}});

    const handleClick = () => {
        setIsShowed(prev => false);
    }

    const handleBuy = async ()=>{
        try{
            (async()=>{
                const req = await fetch("/api/buyAbility", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"                
                    },
                    body: JSON.stringify({
                        id,
                        code: buyingProgress.ability.code
                    })
                });

                if(!req.ok){
                    return;
                }
                setBuyingProgress((prev)=>({...prev, stage: "final"}));
                const res = await req.json();
                setOwned(prev => [...prev, res.ability]);
                setSkillPoints(res.points);
            })();

        } catch(e){
            //
        }
    }

    return(
        <div className={styles.outer[role]} style={{left: isShowed ? "0" : "-100%"}}>
            <div className="absolute top-0 right-0 m-5 font-jersey text-4xl text-black flex gap-2">
                <div className="py-2 px-5 border-4 border-black bg-amber-300">
                    {skillPoints} skill points available
                </div>
                <div className={`${styles.th[role]} w-16 h-16 border-4 border-black flex justify-center items-center pointer hover:-translate-0.5 hover:shadow-[2px_2px_0px_rgba(0_0_0_/_0.1)]`} onClick={() => {switchRole(role == 'attacker' ? 'defender' : 'attacker'); console.log(role)}}>
                    <img src={back} alt="💫" className=""/>
                </div>
            </div>
            <div className="absolute text-4xl left-5 top-5 pointer" onClick={() => {handleClick()}}><img src={back} alt="Back" className={`${styles.th[role]} h-20 w-20 p-3 pixelart hover:shadow-[4px_4px_0px_rgb(20,20,20)] hover:-translate-y-[4px] hover:-translate-x-[4px] transition-all hoverable`}/></div>
            <h1 className="font-jersey text-7xl text-center text-white text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)] py-3">{role.toUpperCase()}'S SKILL TREE</h1>
            <div className="h-full overflow-auto pb-30">
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
                                                            if(item.category == category && item.rarity == index+1){
                                                                return(
                                                                    <>
                                                                        <SkillTreeAbility data={item} owned={ownedAbilities.filter((value, _) => (item.code == value.code)).length > 0} onClick={() => setBuyingProgress(()=>({stage: "confirm", ability: item}))}/>
                                                                    </>
                                                                );
                                                            }
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
                    {
                        buyingProgress.stage === "confirm" ?
                        <div className="screen absolute backdrop-blur-xs -top-2 left-0 flex items-center justify-center font-jersey text-white text-center">
                            <div className="bg-gray-200 min-w-100 bg-neutral-800 border-4 border-black p-2 popUp">
                                <h2 className="text-2xl">Are you sure you want to buy <h1 className="text-3xl">{buyingProgress.ability?.name}?</h1></h2>
                                <div className="flex gap-5 w-full justify-center py-2">
                                    <Button children={"Yes"} className="mt-0 bg-lime-500" onClick={()=>{handleBuy()}}/>
                                    <Button children={"No"} className="mt-0 bg-red-500" onClick={()=>setBuyingProgress({stage: "", ability: {}})}/>
                                </div>
                            </div>
                        </div>
                        :
                        buyingProgress.stage === "final" ?
                        <div className="screen absolute backdrop-blur-xs -top-2 left-0 flex items-center justify-center font-jersey text-white text-center">
                            <div className="bg-gray-200 min-w-100 bg-neutral-800 border-4 border-black p-2">
                                <h2 className="text-4xl">New ability unlocked!</h2>
                                <img src={abilityImages[buyingProgress.ability?.code]} className="w-full max-w-70 pixelart px-10 mx-auto"/>
                                <h3 className="text-2xl">{buyingProgress.ability?.name}</h3>
                                <div className="flex gap-5 w-full justify-center py-2">
                                    <Button children={"NUTS!"} className="mt-0 bg-yellow-500" onClick={()=>setBuyingProgress({stage: "", ability: {}})}/>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default SkillTreeScreen;