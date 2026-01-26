// effect kinds include: damage, heal, freeze
// NOTE: This is a "HALVED" move list (~25 per scodee), grouped into clear ability families
// to support future skill-tree progression (each family can become an upgrade path).

import Ability from "./Abilities.js";

// ==========================
// ATTACKER (Hacker) — 25 moves
// Target feel: slightly damage-forward, but still has heal + freeze tools.
// Count here: 12 damage, 9 heal, 4 freeze
// ==========================
const attackermoves = [
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
    await Ability.deleteMany({role: "defender"});
    console.log(await Ability.insertMany([...defendermoves]) ? true : false);
  } catch(e){
    console.log(e.message);
  }
}