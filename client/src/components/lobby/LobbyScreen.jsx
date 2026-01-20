import {useState, createContext, act, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AbilitiesMenu from './../ability/AbilitiesMenu.jsx';
import CharacterSwitch from './CharacterSwitch.jsx';
import PlayButtons from "./PlayButtons.jsx";
import Deck from "./Deck.jsx";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Ability from "../ability/Ability.jsx";
import SkillTreeScreen from "../skillTree/SkillTreeScreen.jsx";

export const CharacterContext = createContext();

const LobbyScreen = () => {
    const [activeId, setActiveId] = useState(null);
    const [characterSelected, setCharacterSelected] = useState("attacker");
    const [deck, setDeck] = useState([null, null, null, null]);
    const [abilities, setAbilities] = useState([
  // --- Identity & Access ---
  {
    role: "defender",
    category: "Identity & Access",
    code: "change_default_passwords",
    name: "Change default passwords",
    description: "Replace default passwords with strong, unique ones.",
    cooldown: 2,
    rarity: 1,
    effect: { kind: "heal", value: 1 }
  },
  { 
    role: "defender",
    category: "Identity & Access",
    code: "strong_password_policy_enforcement",
    name: "Strong password policy", 
    description: "Implementing and enforcing a strong password policy.", 
    cooldown: 2, 
    rarity: 2, 
    effect: { kind: "heal", value: 1 } 
  },
  {
    role: "defender",
    category: "Identity & Access",
    code: "account_lockout_after_failures",
    name: "Account lockout",
    description: "Lock accounts after a set number of failed login attempts.",
    cooldown: 4,
    rarity: 2,
    effect: { kind: "freeze", value: 1 }
  },
  {
    role: "defender",
    category: "Identity & Access",
    code: "captcha_implementation",
    name: "CAPTCHA implementation",
    description: "Using CAPTCHAs to prevent automated attacks.",
    cooldown: 4,
    rarity: 2,
    effect: { kind: "freeze", value: 1 }
  },
  {
    role: "defender",
    category: "Identity & Access",
    code: "multi-factor_authentication_mfa",
    name: "MFA",
    description: "Multi-factor authentication for extra security.",
    cooldown: 4,
    rarity: 3,
    effect: { kind: "freeze", value: 1 }
  },
  {
    role: "defender",
    category: "Identity & Access",
    code: "secure_session_cookies",
    name: "Secure session cookies",
    description: "Using secure flags and attributes for cookies.",
    cooldown: 3,
    rarity: 3,
    effect: { kind: "heal", value: 2 }
  },

  // --- Application security ---
  {
    role: "defender",
    category: "Application security",
    code: "input_length_validation",
    name: "Input length validation",
    description: "Validating user inputs to prevent overflows.",
    cooldown: 2,
    rarity: 1,
    effect: { kind: "damage", value: 1 }
  },
  {
    role: "defender",
    category: "Application security",
    code: "parametrized_queries",
    name: "Parametrized queries",
    description: "Using queries to prevent SQL injection.",
    cooldown: 2,
    rarity: 2,
    effect: { kind: "damage", value: 1 }
  },
  {
    role: "defender",
    category: "Application security",
    code: "cross-site_request_forgery_tokens",
    name: "CSRF tokens",
    description: "Using tokens to protect against CSRF attacks.",
    cooldown: 3,
    rarity: 3,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "Application security",
    code: "file_upload_validation",
    name: "File upload validation",
    description: "Validating uploaded files for malicious content.",
    cooldown: 3,
    rarity: 3,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "Application security",
    code: "content_security_policy",
    name: "Content Security Policy",
    description: "Implementing CSP to prevent XSS attacks.",
    cooldown: 3,
    rarity: 4,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "Application security",
    code: "jwt_signing_and_validation",
    name: "JWT signing & validation",
    description: "Ensuring integrity of JSON Web Tokens.",
    cooldown: 3,
    rarity: 4,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "Application security",
    code: "server-side_request_forgery_protections",
    name: "SSRF protections",
    description: "Preventing Server-Side Request Forgery.",
    cooldown: 4,
    rarity: 5,
    effect: { kind: "damage", value: 3 }
  },

  // --- Infrastructure ---
  {
    role: "defender",
    category: "Infrastructure",
    code: "basic_firewall_rules",
    name: "Basic firewall rules",
    description: "Control incoming and outgoing network traffic.",
    cooldown: 2,
    rarity: 1,
    effect: { kind: "damage", value: 1 }
  },
  {
    role: "defender",
    category: "Infrastructure",
    code: "transport_layer_security_handling",
    name: "TLS handling",
    description: "Properly implementing TLS for data in transit.",
    cooldown: 2,
    rarity: 2,
    effect: { kind: "heal", value: 1 }
  },
  {
    role: "defender",
    category: "Infrastructure",
    code: "user_privilege_separation",
    name: "User privilege separation",
    description: "Limit access to reduce breach impact.",
    cooldown: 3,
    rarity: 3,
    effect: { kind: "heal", value: 2 }
  },
  {
    role: "defender",
    category: "Infrastructure",
    code: "security_headers",
    name: "Security headers",
    description: "Headers to protect against web vulnerabilities.",
    cooldown: 3,
    rarity: 4,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "Infrastructure",
    code: "secure_boot_chains",
    name: "Secure boot chains",
    description: "Ensuring integrity of the boot process.",
    cooldown: 4,
    rarity: 5,
    effect: { kind: "heal", value: 3 }
  },
  {
    role: "defender",
    category: "Infrastructure",
    code: "sandboxing_untrusted_code",
    name: "Sandboxing code",
    description: "Isolated environments for untrusted code.",
    cooldown: 4,
    rarity: 5,
    effect: { kind: "damage", value: 3 }
  },
  {
    role: "defender",
    category: "Infrastructure",
    code: "kernel_hardening",
    name: "Kernel hardening",
    description: "Strengthening the OS against exploitation.",
    cooldown: 5,
    rarity: 6,
    effect: { kind: "heal", value: 4 }
  },

  // --- SOC & Monitoring ---
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "basic_logging_and_auditing",
    name: "Basic logging & auditing",
    description: "Monitor system activity to detect incidents.",
    cooldown: 2,
    rarity: 1,
    effect: { kind: "damage", value: 1 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "intrusion_detection_system",
    name: "Intrusion Detection (IDS)",
    description: "Monitor network traffic for suspicious activity.",
    cooldown: 5,
    rarity: 4,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "behavioral_anomaly_detection",
    name: "Behavioral detection",
    description: "Identify unusual user or system behavior.",
    cooldown: 5,
    rarity: 5,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "inccodeent_response_playbooks",
    name: "Incident response playbooks",
    description: "Standard procedures for security incidents.",
    cooldown: 4,
    rarity: 5,
    effect: { kind: "damage", value: 4 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "threat_intelligence_integration",
    name: "Threat intelligence",
    description: "Staying informed about emerging threats.",
    cooldown: 4,
    rarity: 6,
    effect: { kind: "damage", value: 3 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "supply-chain_security_valcodeation",
    name: "Supply-chain security",
    description: "Verifying third-party security.",
    cooldown: 5,
    rarity: 6,
    effect: { kind: "damage", value: 4 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "formal_verification_of_critical_components",
    name: "Formal verification",
    description: "Mathematical proof of component security.",
    cooldown: 5,
    rarity: 6,
    effect: { kind: "heal", value: 5 }
  }
]);
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

    const [isSkillTreeShowed, setIsSkillTreeShowed] = useState(false);

    useEffect(()=>{
      console.log(isSkillTreeShowed);
    },[isSkillTreeShowed]);

    return(
        <div className="screen bg-gradient-to-t from-neutral-900 to-neutral-800 flex gap-20 overflow-x-clip">
            <SkillTreeScreen abilities={abilities} isShowed={isSkillTreeShowed} setIsShowed={setIsSkillTreeShowed}/>
            <CharacterContext.Provider value = {[characterSelected, setCharacterSelected]}>
                <DndContext onDragStart={(event) => handleDragStart(event)}
                onDragEnd={(event) => handleDragEnd(event)}
                onDragCancel={() => setActiveId(null)}
                >
                    <AbilitiesMenu type={characterSelected} activeId={activeId} setActiveId={setActiveId} abilities={abilities} setIsSkillTreeShowed={setIsSkillTreeShowed}/>
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