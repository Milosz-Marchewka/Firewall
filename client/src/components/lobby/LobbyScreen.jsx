import {useState, createContext, act, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AbilitiesMenu from './../ability/AbilitiesMenu.jsx';
import CharacterSwitch from './CharacterSwitch.jsx';
import Deck from "./Deck.jsx";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Ability from "../ability/Ability.jsx";
import SkillTreeScreen from "../skillTree/SkillTreeScreen.jsx";
import Level from "./Level.jsx";
import Rank from "./Rank.jsx";
import Character from "./Character.jsx";
import LobbyButtons from "./LobbyButtons.jsx";

export const CharacterContext = createContext();
const baseOuterStyles = `screen bg-gradient-to-t from-neutral-950 flex gap-20 `;
const characterGradients = {
    attacker: "to-red-950",
    defender: "to-sky-950"
}

const LobbyScreen = ({user, setUser}) => {
    const [activeId, setActiveId] = useState(null);
    const [characterSelected, setCharacterSelected] = useState("attacker");
    const [decks, setDecks] = useState({
        attacker: [null, null, null, null],
        defender: [null, null, null, null]
    });
    const [abilities, setAbilities] = useState({
      defender: [],
      attacker: []
    });
    const [ownedAbilities, setOwnedAbilities] = useState([]);
    const [outerStyle, setOuterStyle] = useState(baseOuterStyles);
    const [skillPoints, setSkillPoints] = useState(user?.points || 0);
    const [authChecked, setAuthChecked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setOwnedAbilities(prev => prev.sort((a, b) => a.rarity - b.rarity));
    }, [ownedAbilities]);

    useEffect(() => {
        let cancelled = false;

        const refreshUser = async () => {
            try {
                const res = await fetch("/api/account/auth", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) return;
                const data = await res.json();
                if (cancelled || !data?.id) return;
                setUser(data);
                setSkillPoints(data.points ?? 0);
            } catch {
                // ignore
            } finally {
                if (!cancelled) setAuthChecked(true);
            }
        };

        refreshUser();
        return () => {
            cancelled = true;
        };
    }, [setUser]);

    useEffect(()=>{
      try{
        (async()=>{
            if (!authChecked) return;
            if (!user?._id && !user?.id) {
                navigate("/hello");
                return;
            }

          const abilityreq = await fetch("/api/abilities", 
            {method: "GET"}
          );
          if(!abilityreq.ok){
            //
          }
          const abilitydata = await abilityreq.json();
          setAbilities(abilitydata);
          

        const ownedreq = await fetch(`/api/account/abilities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include"
            }
        })
        if(!ownedreq.ok){
            // ignore
        }
        const ownedtemp = await ownedreq.json();
        setOwnedAbilities(ownedtemp.sort((a, b) => a.rarity - b.rarity));
        })();
      } catch(e){
        navigate("/hello");
      }
      setOuterStyle(baseOuterStyles + characterGradients[characterSelected]);
    }, [characterSelected, authChecked, user?._id, user?.id]);

    const handleDragStart = (e) => {
        setActiveId(prev => (e.active.id));
    }
    
    const handleDragEnd = (e) => {
        const localabilities = [...abilities.attacker, ...abilities.defender];
        if(e.over?.id !== undefined){
            let copyDecks = {...decks};

            copyDecks[characterSelected].forEach((item, index) => {
                if(item != null && item.code == activeId){
                    copyDecks[characterSelected][index] = null;
                    return;
                }
            });
            if(e.over?.id == 5){
                let isInDecks = false;
                
            }else{
                copyDecks[characterSelected][e.over?.id] = getAbilitiesById(activeId);
            }
            setDecks(copyDecks);
        }
        // if(e.over?.id == undefined){
        //     setActiveId(null);
        //     return;
        // }
        
        
        setActiveId(null);
    }
    

    const getAbilitiesById = (id) => {
        const localabilities = [...abilities.attacker, ...abilities.defender];
        let item = localabilities.filter(item => item?.code == id)[0];
        return item ? item : [...decks[characterSelected].attacker ?? [], decks[characterSelected]].filter(item => item?.code == id)[0];
    }

    const [isSkillTreeShowed, setIsSkillTreeShowed] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch('/api/account/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch {
            // ignore
        }
        setUser({ id: null });
        navigate('/hello');
    };
    return(
        <div className={outerStyle}>
            <SkillTreeScreen id={user.id} role={characterSelected} switchRole={setCharacterSelected} abilities={characterSelected == "attacker" ? abilities.attacker : abilities.defender} ownedAbilities={ownedAbilities} isShowed={isSkillTreeShowed} setIsShowed={setIsSkillTreeShowed} setOwned={setOwnedAbilities} skillPoints={skillPoints} setSkillPoints={setSkillPoints}/>
            <CharacterContext.Provider value = {[characterSelected, setCharacterSelected]}>
                <DndContext onDragStart={(event) => handleDragStart(event)}
                onDragEnd={(event) => handleDragEnd(event)}
                onDragCancel={() => setActiveId(null)}
                >
                    <AbilitiesMenu type={characterSelected} activeId={activeId} setActiveId={setActiveId} abilities={ownedAbilities} ownedAbilities={ownedAbilities} deck={decks[characterSelected]} setIsSkillTreeShowed={setIsSkillTreeShowed} skillPoints={skillPoints} setSkillPoints={setSkillPoints}/>
                    <div className="w-[60%] p-3 flex flex-col justify-between">
                        <CharacterSwitch/>
                        <div className="flex-1 flex items-center">
                            <Deck deck={decks[characterSelected]} activeId={activeId}/>
                            <div className="relative w-3/4 h-full p-10 pb-15 flex flex-col justify-end items-center">
                                <Character role={characterSelected} className={"h-4/5 w-4/5"}/>
                                <Rank username={user.username} rank={user.rank} />
                                <Level level={user.level} currentXp={user.levelPoints}/>
                            </div>
                        </div>
                        <LobbyButtons username={user?.username} id={user?.id} onLogout={handleLogout} characterSelected={characterSelected} deck={decks[characterSelected]}/>
                    </div>
                    <DragOverlay>
                        {activeId !== null && <Ability data={getAbilitiesById(activeId)} unlocked />}
                    </DragOverlay>
                </DndContext>
            </CharacterContext.Provider>
        </div>
    );
}

export default LobbyScreen;