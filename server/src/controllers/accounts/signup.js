import User from "../../db/User.js";
import bcrypt from 'bcrypt';
import { makeJwtToken } from "./makeJwtToken.js";
import { validateEmail, validateUsername, validatePassword } from "../../utils.js";

const signup = async (req, res) => {
    if([req.body.username, req.body.email, req.body.password].some(f => !f)){
        return res.status(400).send("All fields are required.");
    }
    // if(!validateUsername(req.body.username) || !validateEmail(req.body.email) || !validatePassword(req.body.password)){
    //     return res.status(400).send("Invalid input.");
    // }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    });
    try{
        await user.save();
        res.cookie("auth", makeJwtToken(user._id), {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        
        const safeUser = user.toObject();
        delete safeUser.password;
        delete safeUser.__v;

        return res.status(201).send(safeUser);
    } catch(e) {
        res.status(500).send("Error creating user.");
    }
};

export default signup;