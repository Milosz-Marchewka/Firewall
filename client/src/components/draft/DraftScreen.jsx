import { useState } from "react";
import { getRandomItems } from "../../utils/utils";
import Ability from "../ability/Ability";

const DraftScreen = ()=>{

    const abilities = [
  // balacing: 50% damage, 35% heal, 15% freeze
  // --- HEAL (17) ---
  { name: "Change default passwords", description: "Replace default passwords with strong, unique ones.", cooldown: 2, rarity: 1, effect: { kind: "heal", value: 1 } },
  { name: "Cybersecurity training", description: "Educate employees about cybersecurity best practices.", cooldown: 2, rarity: 1, effect: { kind: "heal", value: 1 } },
  { name: "Strong password policy enforcement", description: "Implementing and enforcing a strong password policy.", cooldown: 2, rarity: 1, effect: { kind: "heal", value: 1 } },
  { name: "HTTPS enforcement", description: "Enforcing HTTPS to secure communication between clients and servers.", cooldown: 2, rarity: 1, effect: { kind: "heal", value: 1 } },
  { name: "Software updates and patching", description: "Keeping software up to date to fix vulnerabilities and improve security.", cooldown: 3, rarity: 2, effect: { kind: "heal", value: 2 } },
  { name: "Password hashing with salt", description: "Using salted hashes to securely store passwords.", cooldown: 3, rarity: 3, effect: { kind: "heal", value: 2 } },
  { name: "Secure session cookies", description: "Using secure flags and attributes for session cookies to protect them from theft.", cooldown: 3, rarity: 3, effect: { kind: "heal", value: 2 } },
  { name: "Least-privilege principle", description: "Granting users and systems the minimum level of access necessary to perform their functions.", cooldown: 3, rarity: 3, effect: { kind: "heal", value: 2 } },
  { name: "Role-based access control", description: "Implementing role-based access control to restrict system access to authorized users.", cooldown: 4, rarity: 4, effect: { kind: "heal", value: 3 } },
  { name: "Secrets management", description: "Using secure methods to store and manage sensitive information like API keys and passwords.", cooldown: 4, rarity: 4, effect: { kind: "heal", value: 3 } },
  { name: "Transport Layer security handling", description: "Properly implementing TLS to secure data in transit.", cooldown: 3, rarity: 4, effect: { kind: "heal", value: 2 } },
  { name: "Secure password reset flows", description: "Implementing secure mechanisms for password resets to prevent unauthorized access.", cooldown: 3, rarity: 3, effect: { kind: "heal", value: 2 } },
  { name: "Secure deserialization patterns", description: "Avoiding unsafe object reconstruction to prevent deserialization vulnerabilities.", cooldown: 4, rarity: 5, effect: { kind: "heal", value: 3 } },
  { name: "Memory-safe languages and mitigations", description: "Using memory-safe programming languages and techniques to prevent memory corruption vulnerabilities.", cooldown: 5, rarity: 6, effect: { kind: "heal", value: 4 } },
  { name: "Kernel hardening", description: "Strengthening the operating system kernel to prevent exploitation and unauthorized access.", cooldown: 5, rarity: 6, effect: { kind: "heal", value: 4 } },
  { name: "Secure boot chains", description: "Ensuring the integrity of the boot process to prevent unauthorized firmware or software from loading.", cooldown: 4, rarity: 6, effect: { kind: "heal", value: 3 } },
  { name: "Formal verification of critical components", description: "Using formal methods to mathematically prove the correctness and security of critical system components.", cooldown: 5, rarity: 7, effect: { kind: "heal", value: 5 } },

  // --- FREEZE (7) ---
  { name: "Account lockout after failures", description: "Lock accounts after a set number of failed login attempts.", cooldown: 4, rarity: 2, effect: { kind: "freeze", value: 1 } },
  { name: "Multi-factor authentication (MFA)", description: "Implementing MFA to add an extra layer of security to user accounts.", cooldown: 4, rarity: 3, effect: { kind: "freeze", value: 1 } },
  { name: "CAPTCHA implementation", description: "Using CAPTCHAs to prevent automated attacks.", cooldown: 4, rarity: 2, effect: { kind: "freeze", value: 1 } },
  { name: "Rate limiting", description: "Implementing rate limiting to prevent brute-force attacks.", cooldown: 4, rarity: 3, effect: { kind: "freeze", value: 1 } },
  { name: "Intrusion Detection System", description: "Deploying IDS to monitor network traffic for suspicious activity.", cooldown: 5, rarity: 5, effect: { kind: "freeze", value: 1 } },
  { name: "Runtime Application Self-Protection", description: "Implementing RASP to detect and prevent real-time application attacks.", cooldown: 6, rarity: 6, effect: { kind: "freeze", value: 2 } },
  { name: "Active defense and deception systems", description: "Deploying honeypots and deception technologies to mislead and detect attackers.", cooldown: 6, rarity: 7, effect: { kind: "freeze", value: 2 } },

  // --- DAMAGE (24) ---
  { name: "Basic firewall rules", description: "Implementing basic firewall rules to control incoming and outgoing network traffic.", cooldown: 2, rarity: 1, effect: { kind: "damage", value: 1 } },
  { name: "Disabling directory listing", description: "Preventing the web server from listing directory contents.", cooldown: 3, rarity: 2, effect: { kind: "damage", value: 2 } },
  { name: "Input length validation", description: "Validating the length of user inputs to prevent buffer overflows.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { name: "Email spam filtering", description: "Implementing spam filters to reduce phishing emails.", cooldown: 2, rarity: 1, effect: { kind: "damage", value: 1 } },
  { name: "User privilege separation", description: "Separating user privileges to limit access and reduce the impact of potential breaches.", cooldown: 3, rarity: 3, effect: { kind: "damage", value: 2 } },
  { name: "Client-side and server-side validation", description: "Validating user inputs on both client and server sides to ensure data integrity.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { name: "Account enumeration protection", description: "Preventing attackers from discovering valid usernames through system responses.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { name: "File upload validation", description: "Validating uploaded files to prevent malicious content.", cooldown: 3, rarity: 3, effect: { kind: "damage", value: 2 } },
  { name: "Basic logging and auditing", description: "Implementing logging and auditing to monitor system activity and detect potential security incidents.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { name: "Parametrized queries", description: "Using parametrized queries to prevent SQL injection attacks.", cooldown: 2, rarity: 2, effect: { kind: "damage", value: 1 } },
  { name: "Content Security Policy", description: "Implementing CSP to prevent cross-site scripting attacks.", cooldown: 3, rarity: 4, effect: { kind: "damage", value: 2 } },
  { name: "Cross-site request forgery tokens", description: "Using CSRF tokens to protect against CSRF attacks.", cooldown: 3, rarity: 3, effect: { kind: "damage", value: 2 } },
  { name: "JWT signing and validation", description: "Using strong signing algorithms and validating JWTs to ensure their integrity.", cooldown: 3, rarity: 4, effect: { kind: "damage", value: 2 } },
  { name: "Security headers", description: "Implementing security headers to protect against common web vulnerabilities.", cooldown: 3, rarity: 4, effect: { kind: "damage", value: 2 } },
  { name: "Application-level authorization checks", description: "Implementing authorization checks at the application level to ensure users can only access permitted resources.", cooldown: 3, rarity: 4, effect: { kind: "damage", value: 2 } },
  { name: "Server-Side Request Forgery protections", description: "Implementing measures to prevent SSRF attacks.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { name: "Privilege boundary hardening", description: "Strengthening the separation between different privilege levels to prevent escalation.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { name: "Behavioral anomaly detection", description: "Using behavioral analytics to identify unusual user or system behavior.", cooldown: 5, rarity: 5, effect: { kind: "damage", value: 2 } },
  { name: "Automated vulnerability scanning", description: "Using automated tools to regularly scan for vulnerabilities in systems and applications.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { name: "Container isolation and hardening", description: "Implementing strong isolation and security measures for containerized applications.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { name: "Sandboxing untrusted code", description: "Running untrusted code in isolated environments to limit its access and potential damage.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 3 } },
  { name: "Incident response playbooks", description: "Developing and following incident response playbooks to effectively handle security incidents.", cooldown: 4, rarity: 5, effect: { kind: "damage", value: 4 } },
  { name: "Threat intelligence integration", description: "Incorporating threat intelligence feeds to stay informed about emerging threats and vulnerabilities.", cooldown: 4, rarity: 6, effect: { kind: "damage", value: 3 } },
  { name: "Supply-chain security validation", description: "Verifying the security of third-party software and hardware before integration.", cooldown: 5, rarity: 7, effect: { kind: "damage", value: 4 } },
];

    const [current, setCurrent] = useState(getRandomItems(abilities, 2));
    console.log(current);
    const [picked, setPicked] = useState([]);

    const handlePicked = (ability)=>{
        setPicked([...picked, ability]);
        if(picked.length < 4){
            setCurrent(getRandomItems(abilities, 2));
        } else {
            console.log("Draft complete", [...picked]);
        }
    }

// on select: if user has less than 4 abilities, refresh
// else proceed to battle screen
    return(
        <div>
            {current.map((ability, index)=>
                <Ability key={index} data={ability} unlocked={true} onClick={()=>handlePicked(ability)}/>
            )}
        </div>
    )
}

export default DraftScreen;