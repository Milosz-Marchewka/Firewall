import mongoose from "mongoose";

const defaults = [{
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
        code: "basic_logging_and_auditing",
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

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    points: {type: Number, default: 0},
    level: {type: Number, default: 0},
    levelPoints: {type: Number, min: 0, default: 0},
    // level 1 - 1xp (1 win)
    // level n - Math.ceil(1.25*(n-1))
    abilities: {type: Array, default: defaults}
});

const User = mongoose.model('User', userSchema);

export default User;