const attackermoves = [
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

const defendermoves = [
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
    },
]

// damage, heal,
// freeze