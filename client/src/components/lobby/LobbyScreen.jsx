import {useState, createContext, act} from "react";
import AbilitiesMenu from './../ability/AbilitiesMenu.jsx';
import CharacterSwitch from './CharacterSwitch.jsx';
import PlayButtons from "./PlayButtons.jsx";
import Deck from "./Deck.jsx";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Ability from "../ability/Ability.jsx";
import Character from "./Character.jsx";

export const CharacterContext = createContext();

const LobbyScreen = () => {
    const [activeId, setActiveId] = useState(null);

    const [characterSelected, setCharacterSelected] = useState("attacker");

    const handleDragStart = (e) => {
        console.log(e.active.code);
        setActiveId(prev => (e.active.code));
    }
    
    const handleDragEnd = (e) => {
        console.log(e.over?.code, e.active?.code);
        console.log(deck);
        if(e.over?.code !== undefined){
            setAbilities(prev => (abilities.filter((item) => (item.code !== activeId))));
    
            let copyDeck = deck.slice();

            copyDeck.forEach((item, index) => {
                if(item != null && item.code == activeId){
                    copyDeck[index] = null;
                    return;
                }
            });
            if(e.over?.code == 5){
                let isInDeck = false;
                
            }else{
                copyDeck[e.over?.code] = getAbilitiesById(activeId);
            }
            setDeck(copyDeck);
        }
        setActiveId(null);
    }
    
    const [abilities, setAbilities] = useState([]);


    const [deck, setDeck] = useState([null, null, null, null]);

    const getAbilitiesById = (id) => {
        let item = abilities.filter(item => item.code == id)[0];
        return item ? item : deck.filter(item => item?.code == id)[0];
    }

    return(
        <div className="screen bg-gradient-to-t from-neutral-900 to-neutral-800 flex gap-20 overflow-x-clip">
            <CharacterContext.Provider value = {[characterSelected, setCharacterSelected]}>
                <DndContext onDragStart={(event) => handleDragStart(event)}
                onDragEnd={(event) => handleDragEnd(event)}
                onDragCancel={() => setActiveId(null)}
                >
                    <AbilitiesMenu type={characterSelected} activeId={activeId} setActiveId={setActiveId} abilities={abilities} setAbilities={setAbilities}/>
                    <div className="w-[60%] p-3 flex flex-col justify-between">
                        <CharacterSwitch/>
                        <div className="flex-1 flex items-center">
                            <Deck deck={deck} activeId={activeId}/>
                        </div>
                        <PlayButtons/>
                    </div>
                    <DragOverlay>
                        {activeId !== null && <Ability id={activeId} data={getAbilitiesById(activeId)} unlocked onClick={console.log("aaa", getAbilitiesById(activeId))}/>}
                    </DragOverlay>
                </DndContext>
            </CharacterContext.Provider>
            <Character/>
        </div>
    );
}

export default LobbyScreen;