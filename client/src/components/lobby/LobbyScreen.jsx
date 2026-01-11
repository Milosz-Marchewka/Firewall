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
        console.log(e.active.id);
        setActiveId(prev => (e.active.id));
    }
    
    const handleDragEnd = (e) => {
        console.log(e.over?.id, e.active?.id);
        console.log(deck);
        if(e.over?.id !== undefined){
            setAbilities(prev => (abilities.filter((item) => (item.id !== activeId))));
    
            let copyDeck = deck.slice();

            copyDeck.forEach((item, index) => {
                if(item != null && item.id == activeId){
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
    
const [abilities, setAbilities] = useState([
  // --- HEAL (17) ---
  { id: 0, name: "Change default passwords", description: "Replace default passwords with strong, unique ones.", cooldown: 2, rarity: 1, effect: { kind: "heal", value: 1 } },
  { id: 1, name: "Cybersecurity training", description: "Educate employees about cybersecurity best practices.", cooldown: 2, rarity: 1, effect: { kind: "heal", value: 1 } },
  { id: 2, name: "Strong password policy enforcement", description: "Implementing and enforcing a strong password policy.", cooldown: 2, rarity: 1, effect: { kind: "heal", value: 1 } },
  { id: 3, name: "HTTPS enforcement", description: "Enforcing HTTPS to secure communication between clients and servers.", cooldown: 2, rarity: 1, effect: { kind: "heal", value: 1 } },
  { id: 4, name: "Software updates and patching", description: "Keeping software up to date to fix vulnerabilities and improve security.", cooldown: 3, rarity: 2, effect: { kind: "heal", value: 2 } },
  { id: 5, name: "Password hashing with salt", description: "Using salted hashes to securely store passwords.", cooldown: 3, rarity: 3, effect: { kind: "heal", value: 2 } },
  { id: 6, name: "Secure session cookies", description: "Using secure flags and attributes for session cookies to protect them from theft.", cooldown: 3, rarity: 3, effect: { kind: "heal", value: 2 } },
  { id: 7, name: "Least-privilege principle", description: "Granting users and systems the minimum level of access necessary to perform their functions.", cooldown: 3, rarity: 3, effect: { kind: "heal", value: 2 } },
  { id: 8, name: "Role-based access control", description: "Implementing role-based access control to restrict system access to authorized users.", cooldown: 4, rarity: 4, effect: { kind: "heal", value: 3 } },
  { id: 9, name: "Secrets management", description: "Using secure methods to store and manage sensitive information like API keys and passwords.", cooldown: 4, rarity: 4, effect: { kind: "heal", value: 3 } },
  { id: 10, name: "Transport Layer security handling", description: "Properly implementing TLS to secure data in transit.", cooldown: 3, rarity: 4, effect: { kind: "heal", value: 2 } },
  { id: 11, name: "Secure password reset flows", description: "Implementing secure mechanisms for password resets to prevent unauthorized access.", cooldown: 3, rarity: 3, effect: { kind: "heal", value: 2 } },
  { id: 12, name: "Secure deserialization patterns", description: "Avoiding unsafe object reconstruction to prevent deserialization vulnerabilities.", cooldown: 4, rarity: 5, effect: { kind: "heal", value: 3 } },
  { id: 13, name: "Memory-safe languages and mitigations", description: "Using memory-safe programming languages and techniques to prevent memory corruption vulnerabilities.", cooldown: 5, rarity: 6, effect: { kind: "heal", value: 4 } },
  { id: 14, name: "Kernel hardening", description: "Strengthening the operating system kernel to prevent exploitation and unauthorized access.", cooldown: 5, rarity: 6, effect: { kind: "heal", value: 4 } },
  { id: 15, name: "Secure boot chains", description: "Ensuring the integrity of the boot process to prevent unauthorized firmware or software from loading.", cooldown: 4, rarity: 6, effect: { kind: "heal", value: 3 } },
  { id: 16, name: "Formal verification of critical components", description: "Using formal methods to mathematically prove the correctness and security of critical system components.", cooldown: 5, rarity: 7, effect: { kind: "heal", value: 5 } },

  // --- FREEZE (7) ---
  { id: 17, name: "Account lockout after failures", description: "Lock accounts after a set number of failed login attempts.", cooldown: 4, rarity: 2, effect: { kind: "freeze", value: 1 } },
  { id: 18, name: "Multi-factor authentication (MFA)", description: "Implementing MFA to add an extra layer of security to user accounts.", cooldown: 4, rarity: 3, effect: { kind: "freeze", value: 1 } },
  { id: 19, name: "CAPTCHA implementation", description: "Using CAPTCHAs to prevent automated attacks.", cooldown: 4, rarity: 2, effect: { kind: "freeze", value: 1 } },
  { id: 20, name: "Rate limiting", description: "Implementing rate limiting to prevent brute-force attacks.", cooldown: 4, rarity: 3, effect: { kind: "freeze", value: 1 } },
  { id: 21, name: "Intrusion Detection System", description: "Deploying IDS to monitor network traffic for suspicious activity.", cooldown: 5, rarity: 5, effect: { kind: "freeze", value: 1 } },
  { id: 22, name: "Runtime Application Self-Protection", description: "Implementing RASP to detect and prevent real-time application attacks.", cooldown: 6, rarity: 6, effect: { kind: "freeze", value: 2 } },
  { id: 23, name: "Active defense and deception systems", description: "Deploying honeypots and deception technologies to mislead and detect attackers.", cooldown: 6, rarity: 7, effect: { kind: "freeze", value: 2 } },

  // --- DAMAGE (24) ---
  { id: 24, name: "Basic firewall rules", description: "Implementing basic firewall rules to control incoming and outgoing network traffic.", cooldown: 2, rarity: 1, effect: { kind: "damage", value: 1 } },
  { id: 25, name: "Disabling directory listing", description: "Preventing the web server from listing directory contents.", cooldown: 3, rarity: 2, effect: { kind: "damage", value: 2 } },
  { id: 26, name: "Input length validation", description: "Validating the length of user inputs to prevent buffer overflows.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { id: 27, name: "Email spam filtering", description: "Implementing spam filters to reduce phishing emails.", cooldown: 2, rarity: 1, effect: { kind: "damage", value: 1 } },
  { id: 28, name: "User privilege separation", description: "Separating user privileges to limit access and reduce the impact of potential breaches.", cooldown: 3, rarity: 3, effect: { kind: "damage", value: 2 } },
  { id: 29, name: "Client-side and server-side validation", description: "Validating user inputs on both client and server sides to ensure data integrity.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { id: 30, name: "Account enumeration protection", description: "Preventing attackers from discovering valid usernames through system responses.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { id: 31, name: "File upload validation", description: "Validating uploaded files to prevent malicious content.", cooldown: 3, rarity: 3, effect: { kind: "damage", value: 2 } },
  { id: 32, name: "Basic logging and auditing", description: "Implementing logging and auditing to monitor system activity and detect potential security incidents.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { id: 33, name: "Parametrized queries", description: "Using parametrized queries to prevent SQL injection attacks.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { id: 34, name: "Content Security Policy", description: "Implementing CSP to prevent cross-site scripting attacks.", cooldown: 3, rarity: 4, effect: { kind: "damage", value: 2 } },
  { id: 35, name: "Cross-site request forgery tokens", description: "Using CSRF tokens to protect against CSRF attacks.", cooldown: 3, rarity: 3, effect: { kind: "damage", value: 2 } },
  { id: 36, name: "JWT signing and validation", description: "Using strong signing algorithms and validating JWTs to ensure their integrity.", cooldown: 3, rarity: 4, effect: { kind: "damage", value: 2 } },
  { id: 37, name: "Security headers", description: "Implementing security headers to protect against common web vulnerabilities.", cooldown: 3, rarity: 4, effect: { kind: "damage", value: 2 } },
  { id: 38, name: "Application-level authorization checks", description: "Implementing authorization checks at the application level to ensure users can only access permitted resources.", cooldown: 3, rarity: 4, effect: { kind: "damage", value: 2 } },
  { id: 39, name: "Server-Side Request Forgery protections", description: "Implementing measures to prevent SSRF attacks.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { id: 40, name: "Privilege boundary hardening", description: "Strengthening the separation between different privilege levels to prevent escalation.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { id: 41, name: "Behavioral anomaly detection", description: "Using behavioral analytics to identify unusual user or system behavior.", cooldown: 5, rarity: 5, effect: { kind: "damage", value: 2 } },
  { id: 42, name: "Automated vulnerability scanning", description: "Using automated tools to regularly scan for vulnerabilities in systems and applications.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { id: 43, name: "Container isolation and hardening", description: "Implementing strong isolation and security measures for containerized applications.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { id: 44, name: "Sandboxing untrusted code", description: "Running untrusted code in isolated environments to limit its access and potential damage.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { id: 45, name: "Incident response playbooks", description: "Developing and following incident response playbooks to effectively handle security incidents.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 4 } },
  { id: 46, name: "Threat intelligence integration", description: "Incorporating threat intelligence feeds to stay informed about emerging threats and vulnerabilities.", cooldown: 4, rarity: 6, effect: { kind: "damage", value: 3 } },
  { id: 47, name: "Supply-chain security validation", description: "Verifying the security of third-party software and hardware before integration.", cooldown: 5, rarity: 7, effect: { kind: "damage", value: 4 } },
]);


    const [deck, setDeck] = useState([null, null, null, null]);

    const getAbilitiesById = (id) => {
        let item = abilities.filter(item => item.id == id)[0];
        return item ? item : deck.filter(item => item?.id == id)[0];
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
                        {activeId !== null && <Ability id={activeId} data={getAbilitiesById(activeId)} unlocked onClick={console.log("aaa", getAbilitiesById(activeId))}/>}
                    </DragOverlay>
                </DndContext>
            </CharacterContext.Provider>
            <Character/>
        </div>
    );
}

export default LobbyScreen;