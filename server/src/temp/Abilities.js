import mongoose from "mongoose";

const AbilitySchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  cooldown: {type: Number, min: 0},
  rarity: {type: Number, min: 1},
  effect: {
    kind: {type: String}, // damage, heal, buff, freeze, etc
    value: {type: Number}
  }
}, { _id: false });

const Ability = mongoose.model('Ability', AbilitySchema);

export default Ability;