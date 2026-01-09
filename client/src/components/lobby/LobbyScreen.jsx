import {useState, createContext} from "react";
import AbilitiesMenu from './../ability/AbilitiesMenu.jsx';
import CharacterSwitch from './CharacterSwitch.jsx';
import PlayButtons from "./PlayButtons.jsx";
import Deck from "./Deck.jsx";

export const CharacterContext = createContext();

const LobbyScreen = () => {

    const [characterSelected, setCharacterSelected] = useState("attacker");

    return(
        <div className="screen bg-gradient-to-t from-neutral-900 to-neutral-800 flex gap-20">
            <CharacterContext.Provider value = {[characterSelected, setCharacterSelected]}>
                <AbilitiesMenu type={characterSelected}/>
                <div className="w-[60%] p-3 flex flex-col justify-between">
                    <CharacterSwitch/>
                    <div className="flex-1 flex items-center">
                        <Deck/>
                    </div>
                    <PlayButtons/>
                </div>
            </CharacterContext.Provider>
        </div>
    );
}

export default LobbyScreen;