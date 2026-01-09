import { useContext, useEffect, useRef } from "react";
import { CharacterContext } from "./LobbyScreen";
import "./CharacterSwitch.css";

const PlayButtons = () => {

    const [char, charSelected] = useContext(CharacterContext);
    const attackerRef = useRef(null);
    const deffenderRef = useRef(null);

    useEffect(()=>{

    },char)

    return(
        <div className="grid grid-cols-2 text-center font-jersey text-white w-3/4 self-end gap-10">
            <div className="bg-gray-500 text-6xl py-5 flex items-center justify-center border-6 border-black/80
            hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_rgb(0_0_0)] cursor-pointer">
                <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">QUICK MATCH</h2>
            </div>
            <div className="bg-amber-400 text-6xl py-5 flex items-center justify-center border-6 border-black/80
            hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_rgb(0_0_0)] cursor-pointer">
                <h2 className="text-shadow-[3px_3px_0px_rgb(0_0_0)]">PLAY</h2>
            </div>
        </div>
    );
}

export default PlayButtons;