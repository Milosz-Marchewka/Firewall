// effect kinds include: damage, heal, freeze
// NOTE: This is a "HALVED" move list (~25 per scodee), grouped into clear ability families
// to support future skill-tree progression (each family can become an upgrade path).

import Ability from "../db/Abilities.js";

// ==========================
// ATTACKER (Hacker) — 25 moves
// Target feel: slightly damage-forward, but still has heal + freeze tools.
// Count here: 12 damage, 9 heal, 4 freeze
// ==========================
const attackermoves =  [

  // --- Credential & codeentity Attacks (4) ---

   {

    role: "attacker",

    category: "Credentials & Identity",

    code: "password_guess",

    name: "Password guess",

    description: "Attempt to guess the password of the target system.",

    cooldown: 1,

    rarity: 1,

    effect: { kind: "damage", value: 1 }

  },

  {

    role: "attacker",

    category: "Credentials & Identity",

    code: "credential_stuffing",

    name: "Credential stuffing",

    description: "Reusing leaked credentials to gain access.",

    cooldown: 2,

    rarity: 2,

    effect: { kind: "damage", value: 3 }

  },

  {

    role: "attacker",

    category: "Credentials & Identity",

    code: "brute-force_attack",

    name: "Brute-force attack",

    description: "Systematically trying combinations to crack passwords.",

    cooldown: 3,

    rarity: 4,

    effect: { kind: "damage", value: 4 }

  },

  {

    role: "attacker",

    category: "Credentials & Identity",

    code: "mfa_bypass_phishing",

    name: "MFA bypass phishing",

    description: "Sophisticated phishing to trick users into revealing MFA codes.",

    cooldown: 5,

    rarity: 6,

    effect: { kind: "freeze", value: 2 }

  },

 

  // --- Exploits & Persistence ---

  {

    role: "attacker",

    category: "Exploits & Persistence",

    code: "url_parameter_tampering",

    name: "URL parameter tampering",

    description: "Manipulate URL parameters to exploit vulnerabilities.",

    cooldown: 2,

    rarity: 1,

    effect: { kind: "damage", value: 2 }

  },

  {

    role: "attacker",

    category: "Exploits & Persistence",

    code: "sql_injection",

    name: "SQL Injection",

    description: "Injecting malicious queries to manipulate databases.",

    cooldown: 3,

    rarity: 3,

    effect: { kind: "damage", value: 4 }

  },

  {

    role: "attacker",

    category: "Exploits & Persistence",

    code: "file_extension_bypass",

    name: "File extension bypass",

    description: "Exploiting upload validation to plant malicious files.",

    cooldown: 4,

    rarity: 4,

    effect: { kind: "damage", value: 4 }

  },

  {

    role: "attacker",

    category: "Exploits & Persistence",

    code: "command_injection",

    name: "Command Injection",

    description: "Injecting commands to be executed by the host OS.",

    cooldown: 4,

    rarity: 5,

    effect: { kind: "damage", value: 5 }

  },

  {

    role: "attacker",

    category: "Exploits & Persistence",

    code: "stored_xss_attack",

    name: "Stored XSS attack",

    description: "Injecting scripts permanently stored on the server.",

    cooldown: 5,

    rarity: 6,

    effect: { kind: "damage", value: 7 }

  },

  {

    role: "attacker",

    category: "Exploits & Persistence",

    code: "apt_intrusion",

    name: "APT Intrusion",

    description: "Establishing persistent presence within a target network.",

    cooldown: 6,

    rarity: 6,

    effect: { kind: "heal", value: 4 }

  },

 

  // --- Network & System ---

  {

    role: "attacker",

    category: "Network & System",

    code: "connect_via_unsecured_wi-fi",

    name: "Connect via unsecured Wi-Fi",

    description: "Connect to the target via an unsecured network.",

    cooldown: 2,

    rarity: 1,

    effect: { kind: "heal", value: 1 }

  },

  {

    role: "attacker",

    category: "Network & System",

    code: "man-in-the-middle_attack",

    name: "Man-in-the-Middle attack",

    description: "Intercepting and altering communications silently.",

    cooldown: 4,

    rarity: 3,

    effect: { kind: "freeze", value: 1 }

  },

  {

    role: "attacker",

    category: "Network & System",

    code: "server-side_request_forgery",

    name: "Server-side request forgery",

    description: "Forcing the server to make unauthorized internal requests.",

    cooldown: 4,

    rarity: 4,

    effect: { kind: "heal", value: 3 }

  },

  {

    role: "attacker",

    category: "Network & System",

    code: "privilege_escalation_via_misconfiguration",

    name: "Privilege Escalation via misconfiguration",

    description: "Exploiting misconfigurations to gain higher privileges.",

    cooldown: 5,

    rarity: 5,

    effect: { kind: "damage", value: 6 }

  },

  {

    role: "attacker",

    category: "Network & System",

    code: "man-in-the-browser_attack",

    name: "Man-in-the-Browser attack",

    description: "Injecting code into browser to manipulate interactions.",

    cooldown: 5,

    rarity: 5,

    effect: { kind: "freeze", value: 2 }

  },

  {

    role: "attacker",

    category: "Network & System",

    code: "kernel_privilege_escalation",

    name: "Kernel privilege escalation",

    description: "Exploiting kernel vulnerabilities for root access.",

    cooldown: 5,

    rarity: 6,

    effect: { kind: "damage", value: 6 }

  },

  {

    role: "attacker",

    category: "Network & System",

    code: "sandbox_escape",

    name: "Sandbox escape",

    description: "Breaking out of restricted environments to host system.",

    cooldown: 5,

    rarity: 6,

    effect: { kind: "damage", value: 6 }

  },

 

  // --- Recon & Supply chain ---

  {

    role: "attacker",

    category: "Recon & Supply chain",

    code: "browse_open_directories",

    name: "Browse open directories",

    description: "Look for sensitive info in open directories.",

    cooldown: 3,

    rarity: 1,

    effect: { kind: "heal", value: 1 }

  },

  {

    role: "attacker",

    category: "Recon & Supply chain",

    code: "typosquatting",

    name: "Typosquatting",

    description: "Create similar domains to deceive users.",

    cooldown: 3,

    rarity: 2,

    effect: { kind: "heal", value: 2 }

  },

  {

    role: "attacker",

    category: "Recon & Supply chain",

    code: "business_logic_abuse",

    name: "Business logic abuse",

    description: "Exploiting flaws in business logic for unauthorized actions.",

    cooldown: 3,

    rarity: 3,

    effect: { kind: "heal", value: 2 }

  },

  {

    role: "attacker",

    category: "Recon & Supply chain",

    code: "session_fixation",

    name: "Session fixation",

    description: "Hijacking valid user sessions via fixed IDs.",

    cooldown: 3,

    rarity: 4,

    effect: { kind: "heal", value: 2 }

  },

  {

    role: "attacker",

    category: "Recon & Supply chain",

    code: "email_spoofing",

    name: "Email spoofing",

    description: "Sending emails with forged sender addresses.",

    cooldown: 3,

    rarity: 5,

    effect: { kind: "heal", value: 2 }

  },

  {

    role: "attacker",

    category: "Recon & Supply chain",

    code: "supply-chain_attack",

    name: "Supply-chain attack",

    description: "Compromising 3rd party software to gain access.",

    cooldown: 6,

    rarity: 6,

    effect: { kind: "freeze", value: 2 }

  }

]; 
// ==========================
// DEFENDER (Cybersec) — 25 moves
// Target: 50% damage, 35% heal, 15% freeze (approx with 25 items)
// Count here: 12 damage, 9 heal, 4 freeze
// ==========================
const defendermoves = [
  // --- codeentity & Access Defense (4) ---
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
    code: "strong_password_policy",
    name: "Strong password policy", 
    description: "Implementing and enforcing a strong password policy.", 
    cooldown: 2, 
    rarity: 2, 
    effect: { kind: "heal", value: 1 } 
  },
  {
    role: "defender",
    category: "Identity & Access",
    code: "account_lockout",
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
    name: "Multi-factor authentication",
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
    code: "CSRF_tokens",
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
    code: "jwt_signing_&_validation",
    name: "JWT signing & validation",
    description: "Ensuring integrity of JSON Web Tokens.",
    cooldown: 3,
    rarity: 4,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "Application security",
    code: "SSRF_protections",
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
    code: "TLS_handling",
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
    code: "sandboxing_code",
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
    code: "basic_logging_&_auditing",
    name: "Basic logging & auditing",
    description: "Monitor system activity to detect incidents.",
    cooldown: 2,
    rarity: 1,
    effect: { kind: "damage", value: 1 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "intrusion_detection_(IDS)",
    name: "Intrusion Detection (IDS)",
    description: "Monitor network traffic for suspicious activity.",
    cooldown: 5,
    rarity: 4,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "behavioral_detection",
    name: "Behavioral detection",
    description: "Identify unusual user or system behavior.",
    cooldown: 5,
    rarity: 5,
    effect: { kind: "damage", value: 2 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "incident_response_playbooks",
    name: "Incident response playbooks",
    description: "Standard procedures for security incidents.",
    cooldown: 4,
    rarity: 5,
    effect: { kind: "damage", value: 4 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "threat_intelligence",
    name: "Threat intelligence",
    description: "Staying informed about emerging threats.",
    cooldown: 4,
    rarity: 6,
    effect: { kind: "damage", value: 3 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "supply-chain_security",
    name: "Supply-chain security",
    description: "Verifying third-party security.",
    cooldown: 5,
    rarity: 6,
    effect: { kind: "damage", value: 4 }
  },
  {
    role: "defender",
    category: "SOC & Monitoring",
    code: "formal_verification",
    name: "Formal verification",
    description: "Mathematical proof of component security.",
    cooldown: 5,
    rarity: 6,
    effect: { kind: "heal", value: 5 }
  }
];

// effect kinds include: damage, heal, freeze
// balancing:

// equal amount of attack kinds between attacker and defender, albeit attacker is a bit more damage heavy, whereas defender utility heavy, henceforth:

// defender can overheal to gain health. however, all health going above 20 is halved. e.g. 18 + 6 heal = 20 + 4/2 = 22hp
// attacker cannot gain health above 20.

// since defender gets an ability to healing, so will the attacker:
// when an attacker overheals, the excess healing is halved and converted to 'exploit' points, which increase the next attack by the excess amount.
// e.g. 18hp + 6 heal = 20hp + 4/2 (2) exploit points. attack 3 dmg + 2 exploit = 5 dmg attack


// you cannot use freeze on an already frozen target, e.g. no freeze stacking
// might convert some heals into shields for defender only

export const add = async () => {
  try{
    await Ability.deleteMany({});
    await Ability.insertMany([...attackermoves, ...defendermoves]);
    console.log(true);
    
  } catch(e){
    
  }
}