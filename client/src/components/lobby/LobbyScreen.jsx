import {useState, createContext, act} from "react";
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
    
const [abilities, setAbilities] = useState([
  // --- Credential & codeentity Attacks (4) ---
  {
    role: "attacker",
    code: "password_guess",
    name: "Password guess",
    description: "Attempt to guess the password of the target system.",
    cooldown: 1,
    rarity: 1,
    effect: { kind: "damage", value: 1 }
  },
  {
    role: "attacker",
    code: "credential_stuffing",
    name: "Credential stuffing",
    description: "Reusing leaked credentials to gain unauthorized access.",
    cooldown: 2,
    rarity: 4,
    effect: { kind: "damage", value: 3 }
  },
  {
    role: "attacker",
    code: "basic_brute-force_attack",
    name: "Basic brute-force attack",
    description: "Systematically trying all possible combinations to crack a password.",
    cooldown: 3,
    rarity: 4,
    effect: { kind: "damage", value: 4 }
  },
  {
    role: "attacker",
    code: "advanced_phishing_with_mfa_bypass",
    name: "Advanced phishing with MFA bypass",
    description: "Using sophisticated phishing techniques to trick users into revealing multi-factor authentication codes.",
    cooldown: 5, // priced up for freeze(2)
    rarity: 6,
    effect: { kind: "freeze", value: 2 }
  },

  // --- Input & Web Exploits (6) ---
  {
    role: "attacker",
    code: "url_parameter_tampering",
    name: "URL parameter tampering",
    description: "Manipulate URL parameters to exploit vulnerabilities.",
    cooldown: 2,
    rarity: 2,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "attacker",
    code: "basic_sql_injection",
    name: "Basic SQL injection",
    description: "Injecting malicious SQL queries to manipulate the database.",
    cooldown: 3,
    rarity: 4,
    effect: { kind: "damage", value: 4 }
  },
  {
    role: "attacker",
    code: "command_injection",
    name: "Command injection",
    description: "Injecting malicious commands to be executed by the host operating system.",
    cooldown: 4,
    rarity: 6,
    effect: { kind: "damage", value: 5 }
  },
  {
    role: "attacker",
    code: "stored_xss_attack",
    name: "Stored XSS attack",
    description: "Injecting malicious scripts that are permanently stored on the target server.",
    cooldown: 5,
    rarity: 7,
    effect: { kind: "damage", value: 7 }
  },
  {
    role: "attacker",
    code: "file_extension_bypass",
    name: "File extension bypass",
    description: "Exploiting weaknesses in file upload valcodeation to upload malicious files.",
    cooldown: 4,
    rarity: 5,
    effect: { kind: "damage", value: 4 }
  },
  {
    role: "attacker",
    code: "business_logic_abuse",
    name: "Business logic abuse",
    description: "Exploiting flaws in business logic to achieve unauthorized actions.",
    cooldown: 3,
    rarity: 4,
    // kept as "heal" to represent attacker momentum / foothold (pairs with exploit rule later)
    effect: { kind: "heal", value: 2 }
  },

  // --- Network & MITM (4) ---
  {
    role: "attacker",
    code: "connect_via_unsecured_wi-fi",
    name: "Connect via unsecured Wi-Fi",
    description: "Connect to the target system using an unsecured Wi-Fi network.",
    cooldown: 2,
    rarity: 1,
    // “foothold gain” style heal (does NOT exceed 20; overflow becomes exploit)
    effect: { kind: "heal", value: 1 }
  },
  {
    role: "attacker",
    code: "man-in-the-middle_attack",
    name: "Man-in-the-middle attack",
    description: "Intercepting and altering communications between two parties without their knowledge.",
    cooldown: 4, // priced up for freeze
    rarity: 5,
    effect: { kind: "freeze", value: 1 }
  },
  {
    role: "attacker",
    code: "man-in-the-browser_attack",
    name: "Man-in-the-browser attack",
    description: "Injecting malicious code into a web browser to intercept and manipulate user interactions.",
    cooldown: 5, // priced up for freeze(2)
    rarity: 6,
    effect: { kind: "freeze", value: 2 }
  },
  {
    role: "attacker",
    code: "server-side_request_forgery",
    name: "Server-side request forgery",
    description: "Forcing the server to make unauthorized requests to internal resources.",
    cooldown: 4,
    rarity: 6,
    effect: { kind: "heal", value: 3 }
  },

  // --- Privilege & Execution Escalation (4) ---
  {
    role: "attacker",
    code: "privilege_escalation_via_misconfiguration",
    name: "Privilege escalation via misconfiguration",
    description: "Exploiting system misconfigurations to gain higher privileges.",
    cooldown: 5,
    rarity: 7,
    effect: { kind: "damage", value: 6 }
  },
  {
    role: "attacker",
    code: "kernel_privilege_escalation",
    name: "Kernel privilege escalation",
    description: "Exploiting vulnerabilities in the operating system kernel to gain higher privileges.",
    cooldown: 5,
    rarity: 7,
    effect: { kind: "damage", value: 6 }
  },
  {
    role: "attacker",
    code: "sandbox_escape",
    name: "Sandbox escape",
    description: "Breaking out of a restricted environment to access the host system.",
    cooldown: 5,
    rarity: 7,
    effect: { kind: "damage", value: 6 }
  },
  {
    role: "attacker",
    code: "memory_corruption_exploit",
    name: "Memory corruption exploit",
    description: "Triggering buffer overflows or other memory corruption issues.",
    cooldown: 5,
    rarity: 7,
    effect: { kind: "damage", value: 6 }
  },

  // --- Persistence & Long-Term Intrusion (3) ---
  {
    role: "attacker",
    code: "apt-style_long-term_intrusion",
    name: "APT-style long-term intrusion",
    description: "Establishing a persistent presence within a target network for extended periods.",
    cooldown: 6,
    rarity: 7,
    effect: { kind: "heal", value: 4 }
  },
  {
    role: "attacker",
    code: "firmware_attack",
    name: "Firmware attack",
    description: "Exploiting vulnerabilities in device firmware to gain persistent access.",
    cooldown: 5,
    rarity: 7,
    effect: { kind: "heal", value: 4 }
  },
  {
    role: "attacker",
    code: "supply-chain_compromise",
    name: "Supply-chain compromise",
    description: "Exploiting vulnerabilities in third-party software or hardware to gain access to the target system.",
    cooldown: 6, // priced up for freeze(2)
    rarity: 7,
    effect: { kind: "freeze", value: 2 }
  },

  // --- Recon & Social Engineering (4) ---
  {
    role: "attacker",
    code: "browse_open_directories",
    name: "Browse open directories",
    description: "Look for sensitive information in open directories.",
    cooldown: 3,
    rarity: 1,
    effect: { kind: "heal", value: 1 }
  },
  {
    role: "attacker",
    code: "typosquat_their_domain",
    name: "Typosquat their domain",
    description: "Create a domain similar to the target's to deceive users.",
    cooldown: 3,
    rarity: 2,
    effect: { kind: "heal", value: 2 }
  },
  {
    role: "attacker",
    code: "email_spoofing",
    name: "Email spoofing",
    description: "Sending emails with a forged sender address to deceive recipients.",
    cooldown: 3,
    rarity: 6,
    effect: { kind: "heal", value: 2 }
  },
  {
    role: "attacker",
    code: "session_fixation",
    name: "Session fixation",
    description: "Exploiting a vulnerability that allows an attacker to hijack a valcode user session.",
    cooldown: 3,
    rarity: 5,
    effect: { kind: "heal", value: 2 }
  }
]);


// const [abilities, setAbilities] = useState([
// {
//     role: "defender",
//     code: "change_default_passwords",
//     name: "Change default passwords",
//     description: "Replace default passwords with strong, unique ones.",
//     cooldown: 2,
//     rarity: 1,
//     effect: { kind: "heal", value: 1 }
//   },
//   { 
//     role: "defender",
//     code: "strong_password_policy_enforcement",
//     name: "Strong password policy enforcement", 
//     description: "Implementing and enforcing a strong password policy.", 
//     cooldown: 2, 
//     rarity: 1, 
//     effect: { 
//       kind: "heal", 
//       value: 1 
//     } 
//   },
//   {
//     role: "defender",
//     code: "multi-factor_authentication_mfa",
//     name: "Multi-factor authentication (MFA)",
//     description: "Implementing MFA to add an extra layer of security to user accounts.",
//     cooldown: 4, // priced up for freeze
//     rarity: 3,
//     effect: { kind: "freeze", value: 1 }
//   },
//   {
//     role: "defender",
//     code: "account_lockout_after_failures",
//     name: "Account lockout after failures",
//     description: "Lock accounts after a set number of failed login attempts.",
//     cooldown: 4, // priced up for freeze
//     rarity: 2,
//     effect: { kind: "freeze", value: 1 }
//   },
//   {
//     role: "defender",
//     code: "secure_session_cookies",
//     name: "Secure session cookies",
//     description: "Using secure flags and attributes for session cookies to protect them from theft.",
//     cooldown: 3,
//     rarity: 3,
//     effect: { kind: "heal", value: 2 }
//   },

//   // --- Input & App Defense (6) ---
//   {
//     role: "defender",
//     code: "input_length_validation",
//     name: "Input length validation",
//     description: "Validating the length of user inputs to prevent buffer overflows.",
//     cooldown: 2,
//     rarity: 2,
//     effect: { kind: "damage", value: 1 }
//   },
//   {
//     role: "defender",
//     code: "parametrized_queries",
//     name: "Parametrized queries",
//     description: "Using parametrized queries to prevent SQL injection attacks.",
//     cooldown: 2,
//     rarity: 2,
//     effect: { kind: "damage", value: 1 }
//   },
//   {
//     role: "defender",
//     code: "cross-site_request_forgery_tokens",
//     name: "Cross-site request forgery tokens",
//     description: "Using CSRF tokens to protect against CSRF attacks.",
//     cooldown: 3,
//     rarity: 3,
//     effect: { kind: "damage", value: 2 }
//   },
//   {
//     role: "defender",
//     code: "content_security_policy",
//     name: "Content Security Policy",
//     description: "Implementing CSP to prevent cross-site scripting attacks.",
//     cooldown: 3,
//     rarity: 4,
//     effect: { kind: "damage", value: 2 }
//   },
//   {
//     role: "defender",
//     code: "file_upload_validation",
//     name: "File upload validation",
//     description: "Validating uploaded files to prevent malicious content.",
//     cooldown: 3,
//     rarity: 3,
//     effect: { kind: "damage", value: 2 }
//   },
//   {
//     role: "defender",
//     code: "jwt_signing_and_validation",
//     name: "JWT signing and validation",
//     description: "Using strong signing algorithms and validating JWTs to ensure their integrity.",
//     cooldown: 3,
//     rarity: 4,
//     effect: { kind: "damage", value: 2 }
//   },

//   // --- Network Defense & Transport (4) ---
//   {
//     role: "defender",
//     code: "basic_firewall_rules",
//     name: "Basic firewall rules",
//     description: "Implementing basic firewall rules to control incoming and outgoing network traffic.",
//     cooldown: 2,
//     rarity: 1,
//     effect: { kind: "damage", value: 1 }
//   },
//   {
//     role: "defender",
//     code: "transport_layer_security_handling",
//     name: "Transport Layer security handling",
//     description: "Properly implementing TLS to secure data in transit.",
//     cooldown: 2,
//     rarity: 2,
//     effect: { kind: "heal", value: 1 }
//   },
//   {
//     role: "defender",
//     code: "server-side_request_forgery_protections",
//     name: "Server-Side Request Forgery protections",
//     description: "Implementing measures to prevent SSRF attacks.",
//     cooldown: 4,
//     rarity: 5,
//     effect: { kind: "damage", value: 3 }
//   },
//   {
//     role: "defender",
//     code: "security_headers",
//     name: "Security headers",
//     description: "Implementing security headers to protect against common web vulnerabilities.",
//     cooldown: 3,
//     rarity: 4,
//     effect: { kind: "damage", value: 2 }
//   },

//   // --- Detection & Response (5) ---
//   {
//     role: "defender",
//     code: "basic_logging_and_auditing",
//     name: "Basic logging and auditing",
//     description: "Implementing logging and auditing to monitor system activity and detect potential security inccodeents.",
//     cooldown: 2,
//     rarity: 2,
//     effect: { kind: "damage", value: 1 }
//   },
//   {
//     role: "defender",
//     code: "intrusion_detection_system",
//     name: "Intrusion Detection System",
//     description: "Deploying codeS to monitor network traffic for suspicious activity.",
//     cooldown: 5,
//     rarity: 5,
//     effect: { kind: "damage", value: 2 }
//   },
//   {
//     role: "defender",
//     code: "behavioral_anomaly_detection",
//     name: "Behavioral anomaly detection",
//     description: "Using behavioral analytics to codeentify unusual user or system behavior.",
//     cooldown: 5,
//     rarity: 5,
//     effect: { kind: "damage", value: 2 }
//   },
//   {
//     role: "defender",
//     code: "inccodeent_response_playbooks",
//     name: "Inccodeent response playbooks",
//     description: "Developing and following inccodeent response playbooks to effectively handle security inccodeents.",
//     cooldown: 4,
//     rarity: 5,
//     effect: { kind: "damage", value: 4 }
//   },
//   {
//     role: "defender",
//     code: "threat_intelligence_integration",
//     name: "Threat intelligence integration",
//     description: "Incorporating threat intelligence feeds to stay informed about emerging threats and vulnerabilities.",
//     cooldown: 4,
//     rarity: 6,
//     effect: { kind: "damage", value: 3 }
//   },

//   // --- System Hardening (4) ---
//   {
//     role: "defender",
//     code: "user_privilege_separation",
//     name: "User privilege separation",
//     description: "Separating user privileges to limit access and reduce the impact of potential breaches.",
//     cooldown: 3,
//     rarity: 3,
//     effect: { kind: "heal", value: 2 }
//   },
//   {
//     role: "defender",
//     code: "kernel_hardening",
//     name: "Kernel hardening",
//     description: "Strengthening the operating system kernel to prevent exploitation and unauthorized access.",
//     cooldown: 5,
//     rarity: 6,
//     effect: { kind: "heal", value: 4 }
//   },
//   {
//     role: "defender",
//     code: "secure_boot_chains",
//     name: "Secure boot chains",
//     description: "Ensuring the integrity of the boot process to prevent unauthorized firmware or software from loading.",
//     cooldown: 4,
//     rarity: 6,
//     effect: { kind: "heal", value: 3 }
//   },
//   {
//     role: "defender",
//     code: "sandboxing_untrusted_code",
//     name: "Sandboxing untrusted code",
//     description: "Running untrusted code in isolated environments to limit its access and potential damage.",
//     cooldown: 4,
//     rarity: 5,
//     effect: { kind: "damage", value: 3 }
//   },

//   // --- Supply Chain & Assurance (2) ---
//   {
//     role: "defender",
//     code: "supply-chain_security_valcodeation",
//     name: "Supply-chain security valcodeation",
//     description: "Verifying the security of third-party software and hardware before integration.",
//     cooldown: 5,
//     rarity: 7,
//     effect: { kind: "damage", value: 4 }
//   },
//   {
//     role: "defender",
//     code: "formal_verification_of_critical_components",
//     name: "Formal verification of critical components",
//     description: "Using formal methods to mathematically prove the correctness and security of critical system components.",
//     cooldown: 5,
//     rarity: 7,
//     effect: { kind: "heal", value: 5 }
//   },

//   // --- Utility Control (extra freeze to hit 4 total) ---
//   {
//     role: "defender",
//     code:"captcha_implementation",
//     name: "CAPTCHA implementation",
//     description: "Using CAPTCHAs to prevent automated attacks.",
//     cooldown: 4, // priced up for freeze
//     rarity: 2,
//     effect: { kind: "freeze", value: 1 }
//   }
// ]);


    const [deck, setDeck] = useState([null, null, null, null]);

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