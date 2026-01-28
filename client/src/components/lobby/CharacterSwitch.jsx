import { useContext, useEffect, useRef } from "react";
import { CharacterContext } from "./LobbyScreen";
import "./CharacterSwitch.css";

const CharacterSwitch = () => {

    const [char, charSelected] = useContext(CharacterContext);
    const attackerRef = useRef(null);
    const deffenderRef = useRef(null);

    useEffect(()=>{
        if(char === "attacker"){
            attackerRef.current.classList.add("activeAttacker");
            deffenderRef.current.classList.remove("activeDefender");
        }else{
            deffenderRef.current.classList.add("activeDefender");
            attackerRef.current.classList.remove("activeAttacker");
        }
    },char)

    return(
        <div className="grid grid-cols-2 bg-zinc-800 text-center w-full
        shadow-[5px_5px_0px_rgb(0_0_0)] box-border self-start
        border-3 border-black/50 hoverable">
            <div className="flex items-center justify-center text-red-400 
                border-b-zinc-800
                border-b-3 hover:border-b-red-400 hover:bg-zinc-700/50 
                hover:text-shadow-[2px_2px_0px_rgb(0_0_0/_1)]"
                ref={attackerRef}
                onClick={()=>charSelected("attacker")}>
                <h3 className="font-jersey text-5xl py-2 px-5">Hacker</h3>
            </div>
            <div className="flex items-center justify-center text-sky-400 
                border-b-zinc-800
                border-b-3 hover:border-b-sky-400 hover:bg-zinc-700/50
                hover:text-shadow-[2px_2px_0px_rgb(0_0_0/_1)]"
                ref={deffenderRef}
                onClick={()=>charSelected("defender")}>
                <h3 className="font-jersey text-5xl py-2 px-5 ">Cybersecurity Specialist</h3>
            </div>
        </div>
    );
}

export default CharacterSwitch;