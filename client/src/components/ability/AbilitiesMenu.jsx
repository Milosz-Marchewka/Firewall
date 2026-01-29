import Ability from "./Ability.jsx"
import AbilityBin from "./AbilityBin.jsx";
import { useEffect, useState } from "react";
import SkillTreeIcon from "../../assets/skillTreeIcon.png";

const AbilitiesMenu = ({type, activeId, ownedAbilities, setIsSkillTreeShowed, deck}) => {

    const handleClick = () => {
        setIsSkillTreeShowed(prev =>true);
    }

    const [isEmpty, setIsEmpty] = useState(true);

        const [styles, setStyles] = useState({
        th: {
            defender: "bg-sky-600",
            attacker: "bg-red-600"
        }
    })

    return(
        <div className={`w-[40%]  ${type == 'attacker' ? 'bg-linear-to-t from-red-950 to-red-700/80' : 'bg-linear-to-t from-sky-950 to-sky-700/80'} text-center pt-7 border-r-7 border-black/80`}>
            <div className="flex">
                <div className="absolute left-3 top-7 pointer" onClick={() => {handleClick()}}><img src={SkillTreeIcon} alt="skill tree" className={`${styles.th[type]} border-3 border-black/70 h-17 w-17 p-2 pixelart hover:shadow-[4px_4px_0px_rgb(0_0_0_/_0.4)] hover:-translate-y-[4px] hover:-translate-x-[4px] transition-all hoverable`}/></div>
                {/* <div className="absolute text-4xl left-5 top-5 pointer" onClick={() => {handleClick()}}><img src={back} alt="Back" className={`${styles.th[role]} h-20 w-20 p-3 pixelart hover:shadow-[4px_4px_0px_rgb(20,20,20)] hover:-translate-y-[4px] hover:-translate-x-[4px] hoverable`}/></div> */}
                <h1 className="mx-auto mb-7 text-7xl uppercase font-jersey text-red-100 text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)]">{type}'s ABILITES</h1>
            </div>
            <div className="grid grid-cols-2 gap-2 px-5 pb-1 h-fit max-h-195 w-full overflow-y-scroll max-w-full relative">
                {
                    ownedAbilities?.filter((item) => (item.role === type && (deck.filter((value, _) => (item.code == value?.code)).length == 0))).map((item, index) => {
                        return (<Ability key={index} data={item} unlocked/>);
                        setIsEmpty(false);
                    })
                }
                {
                    isEmpty ? 
                    <h2 className="text-6xl font-jersey text-white/50 text-center col-span-2 px-30 pt-10">There is no available abilities</h2>
                    :
                    ""
                }
                {
                    activeId != null ?
                    <AbilityBin/>
                    :
                    ""
                }
            </div>
        </div>
    );
}

export default AbilitiesMenu;