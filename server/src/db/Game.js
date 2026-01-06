import mongoose from "mongoose";

const AbilitySchema = new mongoose.Schema({
  name: {type: String},
  cooldown: {type: Number, min: 0},
  currentCooldown: {type: Number, min: 0, default: 0},
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
            persistence: {type: Number, default: 20}
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