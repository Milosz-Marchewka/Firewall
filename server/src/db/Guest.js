import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    points: {type: Number, default: 0},
    level: {type: Number, default: 0},
    levelPoints: {type: Number, min: 0, default: 0},
    // level 1 - 1xp (1 win)
    // level n - Math.ceil(1.25*(n-1))
    abilities: {type: Array, default: []}
});

const Guest = mongoose.model('Guest', guestSchema);

export default Guest;