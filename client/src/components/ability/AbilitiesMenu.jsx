import Ability from "./Ability.jsx"
import { DragOverlay } from "@dnd-kit/core";
import AbilityBin from "./AbilityBin.jsx";

const AbilitiesMenu = ({type, activeId, abilities, setIsSkillTreeShowed}) => {

    const handleClick = () => {
        console.log("aaa");
        setIsSkillTreeShowed(prev =>true);
    }

    return(
        <div className={`w-[40%]  ${type == 'attacker' ? 'bg-red-600/50' : 'bg-sky-400/50'} text-center pt-7`}>
            <div className="flex">
                <div className="absolute text-4xl left-5 top-10 pointer" onClick={() => {handleClick()}}>🌳</div>
                <h1 className="mx-auto mb-7 text-7xl uppercase font-jersey text-red-100 text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)]">{type}'s ABILITES</h1>
            </div>
            <div className="grid grid-cols-2 gap-2 px-5 h-fit max-h-195 w-full overflow-y-scroll max-w-full relative">
                {
                    abilities?.map((item, index) => {
                        return (<Ability key={index} data={item} id={item.id} unlocked/>);
                    })
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