import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    points: {type: Number, default: 0},
    level: {type: Number, default: 0},
    levelPoints: {type: Number, min: 0, default: 0},
    // level 1 - 1xp (1 win)
    // level n - Math.ceil(1.25*(n-1))
    abilities: {type: Array, default: []}
});

const User = mongoose.model('User', userSchema);

export default User;