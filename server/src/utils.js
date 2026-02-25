import crypto from 'node:crypto';
import os from 'os';

const URL_LENGTH = 10;
export const URL_BASE = process.env.URL_BASE ?? 'http://localhost:5173';
export const ROLES = ['attacker', 'defender'];

export const createURL = (base) => {
    if (typeof base !== 'string') {
        throw new Error('Base domain must be a string URL starting with http or https.');
    }

    let baseUrl;
    try {
        baseUrl = new URL(base);
    } catch {
        throw new Error('Base domain must be a valid URL starting with http or https.');
    }

    if (baseUrl.protocol !== 'http:' && baseUrl.protocol !== 'https:') {
        throw new Error('Base domain must be a valid URL starting with http or https.');
    }

    const randomPath = crypto.randomBytes(Math.ceil(URL_LENGTH / 2))
        .toString('hex')
        .slice(0, URL_LENGTH);

    const basePath = baseUrl.pathname.endsWith('/') ? baseUrl.pathname : `${baseUrl.pathname}/`;
    baseUrl.pathname = `${basePath}${randomPath}`;

    return baseUrl.toString();
};

export const extractRoomToken = (value) => {
    if (typeof value !== 'string' || value.trim().length === 0) return null;
    const trimmed = value.trim();

    try {
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            const parsed = new URL(trimmed);
            const parts = parsed.pathname.split('/').filter(Boolean);
            return parts.at(-1) ?? null;
        }
    } catch {
        // fall through
    }

    return trimmed;
};

export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export const validatePassword = (password) => {
    // >8, one letter, one number, one special
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

export const clearCookies = (cookies, res)=>{
    const names = new Set(Object.keys(cookies || {}));
    names.add('auth');
    const paths = ['/', '/api', '/api/account', '/api/account/'];

    names.forEach((name) => {
        paths.forEach((path) => {
            res.clearCookie(name, {
                sameSite: "lax",
                secure: process.env.NODE_ENV === 'production',
                path,
            });
        });
    });
}

export const abilityDefaults = [{
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
        category: "SOC & Monitoring",
        code: "basic_logging_&_auditing",
        name: "Basic logging & auditing",
        description: "Monitor system activity to detect incidents.",
        cooldown: 2,
        rarity: 1,
        effect: { kind: "damage", value: 1 }
    },
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
        category: "Exploits & Persistence",
        code: "url_parameter_tampering",
        name: "URL Tampering",
        description: "Manipulate URL parameters to exploit vulnerabilities.",
        cooldown: 2,
        rarity: 1,
        effect: { kind: "damage", value: 2 }
    },
    {
        role: "attacker",
        category: "Network & System",
        code: "connect_via_unsecured_wi-fi",
        name: "Unsecured Wi-Fi",
        description: "Connect to the target via an unsecured network.",
        cooldown: 2,
        rarity: 1,
        effect: { kind: "heal", value: 1 }
    },
    {
        role: "attacker",
        category: "Recon & Supply chain",
        code: "browse_open_directories",
        name: "Open Directories",
        description: "Look for sensitive info in open directories.",
        cooldown: 3,
        rarity: 1,
        effect: { kind: "heal", value: 1 }
    },
];

