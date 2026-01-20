import {useState, createContext, act, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AbilitiesMenu from './../ability/AbilitiesMenu.jsx';
import CharacterSwitch from './CharacterSwitch.jsx';
import PlayButtons from "./PlayButtons.jsx";
import Deck from "./Deck.jsx";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Ability from "../ability/Ability.jsx";

export const CharacterContext = createContext();

const LobbyScreen = () => {
    const [activeId, setActiveId] = useState(null);
    const [characterSelected, setCharacterSelected] = useState("attacker");
    const [deck, setDeck] = useState([null, null, null, null]);
    const [abilities, setAbilities] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
      try{
        (async()=>{
          const req = await fetch("/api/account/auth", {credentials: 'include'});
          if(!req.ok){
            navigate("/hello");
          }
          // const data = await req.json();

          const abilitiesReq = await fetch(`/api/abilities?role=${characterSelected}`, { method: 'GET' });
          if(!abilitiesReq.ok) throw new Error("Failed to fetch abilities");
          const abilitiesData = await abilitiesReq.json();
          setAbilities(abilitiesData);
        })();
      } catch(e){
        navigate("/hello");
      }
    }, []);

    const handleDragStart = (e) => {
        console.log(e.active.id);
        setActiveId(prev => (e.active.id));
    }
    
    const handleDragEnd = (e) => {
        console.log(e.over?.id, e.active?.code);
        console.log(deck);
        if(e.over?.id !== undefined){
            setAbilities(prev => (abilities.filter((item) => (item.code !== activeId))));
    
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
        let item = abilities.filter(item => item?.code == id)[0];
        return item ? item : deck.filter(item => item?.code == id)[0];
    }

    return(
        <div className="screen bg-gradient-to-t from-neutral-900 to-neutral-800 flex gap-20 overflow-x-clip">
            <CharacterContext.Provider value = {[characterSelected, setCharacterSelected]}>
                <DndContext onDragStart={(event) => handleDragStart(event)}
                onDragEnd={(event) => handleDragEnd(event)}
                onDragCancel={() => setActiveId(null)}
                >
                    <AbilitiesMenu type={characterSelected} activeId={activeId} setActiveId={setActiveId} abilities={abilities}/>
                    <div className="w-[60%] p-3 flex flex-col justify-between">
                        <CharacterSwitch/>
                        <div className="flex-1 flex items-center">
                            <Deck deck={deck} activeId={activeId}/>
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