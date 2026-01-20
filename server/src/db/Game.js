import mongoose from "mongoose";

const AbilitySchema = new mongoose.Schema({
    code: {type: String},
    name: {type: String},
    description: {type: String},
    cooldown: {type: Number, min: 0},
    currentCooldown: {type: Number, min: 0, default: 0},
    rarity: {type: Number, min: 1},
    effect: {
        kind: {type: String}, // damage, heal, buff, etc
        value: {type: Number}
    }
}, { _id: false });

// enormous ahh schema
const gameSchema = new mongoose.Schema({
    url: {type: String, required: true, unique: true},
    status: {
        type: String, 
        enum: ['waiting', 'in_progress', 'finished'],
        default: "waiting"
    },
    draft: {
        attackerDone: { type: Boolean, default: false },
        defenderDone: { type: Boolean, default: false }
    },
    skipTurns: {
        attacker: { type: Number, default: 0 },
        defender: { type: Number, default: 0 }
    },
    defender: {
        // storing socket id. note - temporary for 'complete it' sake
        id: {type: String, default: null},
        stats: {
            integrity: {type: Number, default: 20}
        },
        abilities: [AbilitySchema]
    },
    attacker: {
        id: {type: String, default: null},
        stats: {
            persistence: {type: Number, default: 20},
            overflow: {type: Number, default: 0}
        },
        abilities: [AbilitySchema]
    },
    turnNumber: {type: Number, default: 1},
    currentTurn: {
        type: String,
        enum: ['defender', 'attacker'],
        default: 'attacker'
    },
    log: [
        {
            turn: {type: Number},
            player: {
                type: String,
                enum: ['defender', 'attacker']
            },
            action: {
                type: {type: String},
                ability: String,
                effect: {
                    kind: String,
                    value: Number
                }
            },
            timestamp: {type: Date, default: Date.now}
        }
    ]
});

const Game = mongoose.model('Game', gameSchema);

export default Game;