import {useState, createContext, act, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AbilitiesMenu from './../ability/AbilitiesMenu.jsx';
import CharacterSwitch from './CharacterSwitch.jsx';
import PlayButtons from "./PlayButtons.jsx";
import Deck from "./Deck.jsx";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Ability from "../ability/Ability.jsx";
import SkillTreeScreen from "../skillTree/SkillTreeScreen.jsx";
import Level from "./Level.jsx";
import Rank from "./Rank.jsx";
import Character from "./Character.jsx";
export const CharacterContext = createContext();
const baseOuterStyles = `screen bg-gradient-to-t from-neutral-900 flex gap-20 overflow-x-clip `;
const characterGradients = {
    attacker: "to-red-950",
    defender: "to-sky-950"
}

const LobbyScreen = ({user}) => {
    const [activeId, setActiveId] = useState(null);
    const [characterSelected, setCharacterSelected] = useState("attacker");
    const [deck, setDeck] = useState([null, null, null, null]);
    const [abilities, setAbilities] = useState({
      defender: [],
      attacker: []
    });
    const [outerStyle, setOuterStyle] = useState(baseOuterStyles);

    const navigate = useNavigate();

    useEffect(()=>{
      try{
        (async()=>{
          const req = await fetch("/api/account/auth", {credentials: 'include'});
          if(!req.ok){
            navigate("/hello");
          }

          const abilityreq = await fetch("/api/abilities", 
            {method: "GET"}
          );
          if(!abilities.ok){
            //
          }
          setAbilities(await abilityreq.json());
        })();
      } catch(e){
        navigate("/hello");
      }
      setOuterStyle(baseOuterStyles + characterGradients[characterSelected]);
      console.log(user);
      
    }, [characterSelected]);

    const handleDragStart = (e) => {
        console.log(e.active.id);
        setActiveId(prev => (e.active.id));
    }
    
    const handleDragEnd = (e) => {
        console.log(e.over?.id, e.active?.code);
        console.log(deck);
        console.log(abilities);
        const localabilities = [...abilities.attacker, ...abilities.defender];
        if(e.over?.id !== undefined){
            setAbilities(
              prev=>({
                attacker: prev.attacker.filter((item) => (item.code !== activeId)),
                defender: prev.defender.filter((item)=>(item.code != activeId))
              }));
    
            let copyDeck = deck.slice();

            copyDeck.forEach((item, index) => {
                if(item != null && item.code == activeId){
                    copyDeck[index] = null;
                    return;
                }
            });
            if(e.over?.id == 5){
                let isInDeck = false;
                
            }else{
                copyDeck[e.over?.id] = getAbilitiesById(activeId);
            }
            setDeck(copyDeck);
        }
        setActiveId(null);
    }
    

    const getAbilitiesById = (id) => {
        const localabilities = [...abilities.attacker, ...abilities.defender];
        let item = localabilities.filter(item => item?.code == id)[0];
        return item ? item : deck.filter(item => item?.code == id)[0];
    }

    const [isSkillTreeShowed, setIsSkillTreeShowed] = useState(false);
    return(
        <div className={outerStyle}>
            <SkillTreeScreen role={characterSelected} abilities={characterSelected == "attacker" ? abilities.attacker : abilities.defender} isShowed={isSkillTreeShowed} setIsShowed={setIsSkillTreeShowed}/>
            <CharacterContext.Provider value = {[characterSelected, setCharacterSelected]}>
                <DndContext onDragStart={(event) => handleDragStart(event)}
                onDragEnd={(event) => handleDragEnd(event)}
                onDragCancel={() => setActiveId(null)}
                >
                    <AbilitiesMenu type={characterSelected} activeId={activeId} setActiveId={setActiveId}abilities={characterSelected == "attacker" ? abilities.attacker : abilities.defender}  setIsSkillTreeShowed={setIsSkillTreeShowed}/>
                    <div className="w-[60%] p-3 flex flex-col justify-between">
                        <CharacterSwitch/>
                        <div className="flex-1 flex items-center">
                            <Deck deck={deck} activeId={activeId}/>
                            <div className="relative w-3/4 h-full p-10 pb-15 flex flex-col justify-end items-center">
                                <Character role={characterSelected}/>
                                <Rank />
                                <Level level={user.level} currentXp={user.levelPoints}/>
                            </div>
                        </div>
                        <PlayButtons/>
                    </div>
                    <DragOverlay>
                        {activeId !== null && <Ability data={getAbilitiesById(activeId)} unlocked onClick={console.log("aaa", getAbilitiesById(activeId))}/>}
                    </DragOverlay>
                </DndContext>
            </CharacterContext.Provider>
        </div>
    );
}

export default LobbyScreen;