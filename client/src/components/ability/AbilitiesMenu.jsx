import useState from "react";
import Ability from "./Ability.jsx"

const AbilitiesMenu = ({type}) => {
    
    const abilities = [
{
        name: "Change default passwords",
        description: "Replace default passwords with strong, unique ones.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Cybersecurity training",
        description: "Educate employees about cybersecurity best practices.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Strong password policy enforcement",
        description: "Implementing and enforcing a strong password policy.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Account lockout after failures",
        description: "Lock accounts after a set number of failed login attempts.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Basic firewall rules",
        description: "Implementing basic firewall rules to control incoming and outgoing network traffic.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Disabling directory listing",
        description: "Preventing the web server from listing directory contents.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "HTTPS enforcement",
        description: "Enforcing HTTPS to secure communication between clients and servers.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Input length validation",
        description: "Validating the length of user inputs to prevent buffer overflows.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Email spam filtering",
        description: "Implementing spam filters to reduce phishing emails.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Software updates and patching",
        description: "Keeping software up to date to fix vulnerabilities and improve security.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "User privilege separation",
        description: "Separating user privileges to limit access and reduce the impact of potential breaches.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Passwording hashing with salt",
        description: "Using salted hashes to securely store passwords.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Multi-factor authentication (MFA)",
        description: "Implementing MFA to add an extra layer of security to user accounts.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "CAPTCHA implementation",
        description: "Using CAPTCHAs to prevent automated attacks.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Client-side and server-side validation",
        description: "Validating user inputs on both client and server sides to ensure data integrity.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Secure session cookies",
        description: "Using secure flags and attributes for session cookies to protect them from theft.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Account enumeration protection",
        description: "Preventing attackers from discovering valid usernames through system responses.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Rate limiting",
        description: "Implementing rate limiting to prevent brute-force attacks.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "File upload validation",
        description: "Validating uploaded files to prevent malicious content.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Least-privilege principle",
        description: "Granting users and systems the minimum level of access necessary to perform their functions.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Basic logging and auditing",
        description: "Implementing logging and auditing to monitor system activity and detect potential security incidents.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Parametrized queries",
        description: "Using parametrized queries to prevent SQL injection attacks.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Content Security Policy",
        description: "Implementing CSP to prevent cross-site scripting attacks.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Cross-site request forgery tokens",
        description: "Using CSRF tokens to protect against CSRF attacks.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Role-based access control",
        description: "Implementing role-based access control to restrict system access to authorized users.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },

    {
        name: "Secure password reset flows",
        description: "Implementing secure mechanisms for password resets to prevent unauthorized access.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Secrets management",
        description: "Using secure methods to store and manage sensitive information like API keys and passwords.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "JWT signing and validation",
        description: "Using strong signing algorithms and validating JWTs to ensure their integrity.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Transport Layer security handling",
        description: "Properly implementing TLS to secure data in transit.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Automated vulnerability scanning",
        description: "Using automated tools to regularly scan for vulnerabilities in systems and applications.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Security headers",
        description: "Implementing security headers to protect against common web vulnerabilities.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Application-level authorization checks",
        description: "Implementing authorization checks at the application level to ensure users can only access permitted resources.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Server-Side Request Forgery protections",
        description: "Implementing measures to prevent SSRF attacks.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Secure deserialization patterns",
        description: "Avoiding unsafe object reconstruction to prevent deserialization vulnerabilities.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Privilege boundary hardening",
        description: "Strengthening the separation between different privilege levels to prevent escalation.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Runtime Application Self-Protection",
        description: "Implementing RASP to detect and prevent real-time application attacks.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Intrusion Detection System",
        description: "Deploying IDS to monitor network traffic for suspicious activity.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Behavioral anomaly detection",
        description: "Using behavioral analytics to identify unusual user or system behavior.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Memory-safe languages and mitigations",
        description: "Using memory-safe programming languages and techniques to prevent memory corruption vulnerabilities.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Container isolation and hardening",
        description: "Implementing strong isolation and security measures for containerized applications.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Incident response playbooks",
        description: "Developing and following incident response playbooks to effectively handle security incidents.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Kernel hardening",
        description: "Strengthening the operating system kernel to prevent exploitation and unauthorized access.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Secure boot chains",
        description: "Ensuring the integrity of the boot process to prevent unauthorized firmware or software from loading.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Hardware-backed key storage",
        description: "Using hardware security modules or trusted platform modules to securely store cryptographic keys.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Sandboxing untrusted code",
        description: "Running untrusted code in isolated environments to limit its access and potential damage.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Zero trust architecture",
        description: "Implementing a zero trust security model that requires continuous verification of user and device trustworthiness.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Supply-chain security validation",
        description: "Verifying the security of third-party software and hardware before integration.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Adversarial simulation and red teaming",
        description: "Conducting simulated attacks to test and improve security defenses.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Threat intelligence integration",
        description: "Incorporating threat intelligence feeds to stay informed about emerging threats and vulnerabilities.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Formal verification of crtitical components",
        description: "Using formal methods to mathematically prove the correctness and security of critical system components.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Active defense and deception systems",
        description: "Deploying honeypots and deception technologies to mislead and detect attackers.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    }
    ];

    return(
        <div className={`w-[40%] overflow-hidden h-full ${type == 'attacker' ? 'bg-red-600/50' : 'bg-sky-400/50'} text-center pt-7`}>
            <h1 className="mb-7 text-7xl uppercase font-jersey text-red-100 text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)]">{type}'s ABILITES</h1>
            <div className="w-full grid grid-cols-2 gap-2 px-5 h-full overflow-y-scroll">
                {abilities.map((item, index) => (
                    <Ability key={index} data={item} unlocked/>
                ))}
            </div>
        </div>
    );
}

export default AbilitiesMenu;