import { useContext, useEffect, useRef } from "react";
import { CharacterContext } from "./LobbyScreen";
import "./CharacterSwitch.css";
import Ability from "../ability/Ability";
import "./Deck.css";

const Deck = () => {

    const [char, charSelected] = useContext(CharacterContext);
    const deckRef = useRef(null);

    useEffect(()=>{
        if(char === "attacker"){
            deckRef.current.classList.add("activeDeckAttacker");
            deckRef.current.classList.remove("activeDeckDefender");
        }else{
            deckRef.current.classList.add("activeDeckDefender");
            deckRef.current.classList.remove("activeDeckAttacker");
        }
    },char)

    return(
        <div className=" w-1/3 h-fit  p-3 border-3 border-black/50 shadow-[5px_5px_0px_rgb(0_0_0)] flex flex-col gap-2" ref={deckRef}>
            <h3 className="font-jersey text-white text-5xl text-center text-shadow-[2px_2px_0px_rgb(0_0_0)]">Your Deck</h3>
            <Ability unlocked/>
            <Ability unlocked/>
            <Ability unlocked/>
            <Ability unlocked/>
        </div>
    );
}

export default Deck;