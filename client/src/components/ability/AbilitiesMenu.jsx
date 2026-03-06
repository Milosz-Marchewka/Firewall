import Ability from "./Ability.jsx"
import AbilityBin from "./AbilityBin.jsx";
import { useEffect, useState, useRef } from "react";
import SkillTreeIcon from "../../assets/icons/skillTreeIcon.png";
import { typeInfo } from "../../utils/typeInfo.jsx";

const AbilitiesMenu = ({type, activeId, ownedAbilities, setIsSkillTreeShowed, skillPoints, deck}) => {

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

    const info = useRef();
    const [showInfo, setShowInfo] = useState(false);

    useEffect(()=>{
        if(ownedAbilities.filter(item => item.role == type).length <= 4 && deck.filter(item => item == null).length <= 0){
            setIsEmpty(true); 
        } else {
            setIsEmpty(false);
        }
    }, [deck[0], deck[1], deck[2], deck[3], ownedAbilities]);

    const handleInfoEnter = () => setShowInfo(true);
    const handleInfoLeave = () => setShowInfo(false);

    return(
        <div className={`w-[40%]  ${type == 'attacker' ? 'bg-linear-to-t from-red-950 to-red-700/80' : 'bg-linear-to-t from-sky-950 to-sky-700/80'} text-center pt-7 border-r-7 border-black/80`}>
            <div className="flex">
                <div className="left-3 pointer hover:shadow-[4px_4px_0px_rgb(0_0_0_/_0.4)] hover:-translate-y-[4px] hover:-translate-x-[4px] transition-all hoverable relative h-fit w-fit" onClick={() => {handleClick()}}>
                    <img src={SkillTreeIcon} alt="skill tree" className={`${styles.th[type]} border-3 border-black/70 h-17 w-17 p-2 pixelart`}/>
                    {
                        skillPoints > 0 ?
                        <div className="absolute font-jersey bg-amber-300 rounded-[50%] w-7 h-7 flex items-center justify-center -bottom-1 -right-2 outline-2 outline-black">
                            <p className="text-2xl">{skillPoints}</p>
                        </div>
                        : 
                        <></>
                    }
                </div>
                <h1 className="mx-auto mb-7 md:text-5xl xl:text-6xl 2xl:text-7xl uppercase font-jersey text-red-100 text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)]">
                    {type}'s ABILITIES
                    <span className="relative inline-flex items-center justify-center ml-4 h-10 w-10 bottom-2.5 rounded-full border-2 border-white/80 bg-black/40 text-3xl leading-none hover:scale-105 hover:bg-white/10 transition-all lowercase hoverable"
                        onMouseEnter={handleInfoEnter}
                        onMouseLeave={handleInfoLeave}
                    >i</span>
                </h1>
                <div
                    className={`absolute z-999 left-[34%] top-22 max-w-md rounded-md border-2 border-black/80 px-4 py-3 text-left text-lg text-amber-100 shadow-[6px_6px_0px_rgb(0_0_0_/_0.6)] transition-opacity ${showInfo ? "opacity-100" : "opacity-0 pointer-events-none"} ${type == 'attacker' ? 'bg-linear-to-t from-red-950 to-red-700/80' : 'bg-linear-to-t from-sky-950 to-sky-700/80'}`}
                    onMouseEnter={handleInfoEnter}
                    onMouseLeave={handleInfoLeave}
                >
                    {typeInfo[type] ?? "Easter egg :)"}
                </div>
            </div>
            <div className="h-full overflow-scroll pb-30">
                <div className="grid grid-cols-2 gap-2 px-5 pb-1 w-full max-w-full relative">
                    {
                        ownedAbilities?.filter((item) => (item.role === type && (deck.filter((value, _) => (item.code == value?.code)).length == 0))).map((item, index) => {
                            return (<Ability key={index} data={item} unlocked/>);
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
                        <AbilityBin role={type}/>
                        :
                        ""
                    }
                </div>
            </div>
        </div>
    );
}

export default AbilitiesMenu;