import useState from "react";
import Ability from "./Ability.jsx"

const AbilitiesMenu = ({type}) => {
    const attackerAbilities = [
    {
        name: "Password guess",
        description: "Attempt to guess the password of the target system.",
        cooldown: 1,
        rarity: 1,
        effect: {
            kind: "damage",
            value: 1
        }
    },
    {
        name: "Abuse default credentials",
        description: "Use known default credentials to gain access.",
        cooldown: 1,
        rarity: 1,
        effect: {
            kind: "damage",
            value: 1
        }
    },
    {
        name: "Browse open directories",
        description: "Look for sensitive information in open directories.",
        cooldown: 2,
        rarity: 1,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Basic phishing email",
        description: "Send a basic phishing email to trick the user.",
        cooldown: 1,
        rarity: 1,
        effect: {
            kind: "damage",
            value: 1
        }
    },
    {
        name: "Typosquat their domain",
        description: "Create a domain similar to the target's to deceive users.",
        cooldown: 3,
        rarity: 2,
        effect: {
            kind: "damage",
            value: 2
        }
    },
    {
        name: "Connect via unsecured Wi-Fi",
        description: "Connect to the target system using an unsecured Wi-Fi network.",
        cooldown: 1,
        rarity: 1,
        effect: {
            kind: "damage",
            value: 1
        }
    },
    {
        name: "Shoulder surfing",
        description: "Observe the target's screen or keyboard to gather information.",
        cooldown: 3,
        rarity: 2,
        effect: {
            kind: "freeze",
            value: 1
        }
    },
    {
        name: "Public info harvesting",
        description: "Gather information from publicly available sources.",
        cooldown: 4,
        rarity: 3,
        effect: {
            kind: "freeze",
            value: 2
        }
    },
    {
        name: "URL parameter tampering",
        description: "Manipulate URL parameters to exploit vulnerabilities.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "HTML form manipulation",
        description: "Alter HTML forms to bypass client-side validation.",
        cooldown: 3,
        rarity: 3,
        effect: {
            kind: "damage",
            value: 3
        }
    },
    {
        name: "Credential stuffing",
        description: "Reusing leaked credentials to gain unauthorized access.",
        cooldown: 2,
        rarity: 4,
        effect: {
            kind: "damage",
            value: 3
        }
    },
    {
        name: "Basic brute-force attack",
        description: "Systematically trying all possible combinations to crack a password.",
        cooldown: 3,
        rarity: 4,
        effect: {
            kind: "damage",
            value: 4
        }
    },
    {
        name: "Reflected XSS attack",
        description: "Injecting malicious scripts that are reflected off a web server.",
        cooldown: 4,
        rarity: 4.5,
        effect: {
            kind: "damage",
            value: 5
        }
    },
    {
        name: "File extension bypass",
        description: "Exploiting weaknesses in file upload validation to upload malicious files.",
        cooldown: 4,
        rarity: 5,
        effect: {
            kind: "heal",
            value: 3
        }
    },
    {
        name: "Clickjacking",
        description: "Tricking users into clicking on something different from what they perceive.",
        cooldown: 5,
        rarity: 5,
        effect: {
            kind: "freeze",
            value: 3
        }
    },
    {
        name: "Session fixation",
        description: "Exploiting a vulnerability that allows an attacker to hijack a valid user session.",
        cooldown: 2,
        rarity: 5,
        effect: {
            kind: "damage",
            value: 3
        }
    },
    {
        name: "Email spoofing",
        description: "Sending emails with a forged sender address to deceive recipients.",
        cooldown: 3,
        rarity: 6,
        effect: {
            kind: "damage",
            value: 4
        }
    },
    {
        name: "Hidden field abuse",
        description: "Manipulating hidden fields in web forms to alter application behavior.",
        cooldown: 5,
        rarity: 6,
        effect: {
            kind: "damage",
            value: 6
        }
    },
    {
        name: "Directory traversal",
        description: "Accessing files and directories that are stored outside the web root folder.",
        cooldown: 1,
        rarity: 7,
        effect: {
            kind: "damage",
            value: 2
        }
    },
    {
        name: "Bypass CAPTCHA logic flaws",
        description: "Exploiting weaknesses in CAPTCHA implementations to bypass them.",
        cooldown: 4,
        rarity: 7,
        effect: {
            kind: "heal",
            value: 5
        }
    },
    {
        name: "Stored XSS attack",
        description: "Injecting malicious scripts that are permanently stored on the target server.",
        cooldown: 4,
        rarity: 7,
        effect: {
            kind: "damage",
            value: 6
        }
    },
    {
        name: "CSRF attack",
        description: "Forcing a logged-in user to execute unwanted actions on a web application.",
        cooldown: 3,
        rarity: 7,
        effect: {
            kind: "damage",
            value: 4
        }
    },
    {
        name: "Insecure deserialization",
        description: "Exploiting vulnerabilities in deserialization processes to execute arbitrary code.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Basic SQL injection",
        description: "Injecting malicious SQL queries to manipulate the database.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Command injection",
        description: "Injecting malicious commands to be executed by the host operating system.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Exploit race conditions",
        description: "Taking advantage of timing vulnerabilities to gain unauthorized access.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Privilege escalation via misconfiguration",
        description: "Exploiting system misconfigurations to gain higher privileges.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "JWT token manipulation",
        description: "Altering JWT tokens to gain unauthorized access.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Password reset poisoning",
        description: "Manipulating password reset mechanisms to gain access to user accounts.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Business logic abuse",
        description: "Exploiting flaws in business logic to achieve unauthorized actions.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Blind SQL injection",
        description: "Injecting SQL queries without direct feedback from the server.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Server-side request forgery",
        description: "Forcing the server to make unauthorized requests to internal resources.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Memory corruption exploit",
        description: "Triggering buffer overflows or other memory corruption issues.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Bypass authentication via logic flaws",
        description: "Exploiting flaws in authentication logic to gain access without credentials.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Misbind OAuth tokens",
        description: "Exploiting OAuth token misbindings to impersonate users.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Chained vulnerability exploitation",
        description: "Combining multiple lower effect vulnerabilities to achieve a more significant impact.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Kerberos ticket manipulation",
        description: "Altering Kerberos tickets to gain unauthorized access to networks.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "DLL hijacking",
        description: "Exploiting the way applications load DLLs to execute malicious code.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Man-in-the-browser attack",
        description: "Injecting malicious code into a web browser to intercept and manipulate user interactions.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Man-in-the-middle attack",
        description: "Intercepting and altering communications between two parties without their knowledge.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Sandbox escape",
        description: "Breaking out of a restricted environment to access the host system.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Return-Oriented Programming",
        description: "Exploiting existing code snippets to execute arbitrary code without injecting new code.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Kernel privilege escalation",
        description: "Exploiting vulnerabilities in the operating system kernel to gain higher privileges.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Side-channel attacks",
        description: "Extracting secrets from a system by analyzing indirect information like timing or power consumption.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Firmware attack",
        description: "Exploiting vulnerabilities in device firmware to gain persistent access.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Hypervisor escape",
        description: "Breaking out of a virtual machine to access the host system.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Supply-chain compromise",
        description: "Exploiting vulnerabilities in third-party software or hardware to gain access to the target system.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Zero-day exploitation",
        description: "Exploiting previously unknown vulnerabilities for which no patches are available.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Advanced phishing with MFA bypass",
        description: "Using sophisticated phishing techniques to trick users into revealing multi-factor authentication codes.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "Hardware-based attacks",
        description: "Exploiting vulnerabilities in hardware components to gain unauthorized access.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
    {
        name: "APT-style long-term intrusion",
        description: "Establishing a persistent presence within a target network for extended periods.",
        cooldown: 2,
        rarity: 2,
        effect: {
            kind: "heal",
            value: 2
        }
    },
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