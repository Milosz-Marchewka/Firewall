import User from "../../db/User.js";
import bcrypt from 'bcrypt';
import { makeJwtToken } from "./makeJwtToken.js";
import { validateEmail, validateUsername, validatePassword, clearCookies } from "../../utils.js";

const signup = async (req, res) => {
    if([req.body.username, req.body.email, req.body.password].some(f => !f)){
        return res.status(400).send("All fields are required.");
    }

    if(!validateUsername(req.body.username)) return res.status(400).send("Username must be 3-20 characters long and can only contain letters, numbers, and underscores.");
    if(!validateEmail(req.body.email)) return res.status(400).send("Invalid email format.");
    if(!validatePassword(req.body.password)) return res.status(400).send("Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.");

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    });
    try{
        await user.save();

        clearCookies(req.cookies, res);

        res.cookie("auth", makeJwtToken({id: user._id, username: user.username}), {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            path: '/api/account',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        
        const safeUser = user.toObject();
        safeUser.rank = "Noob";
        delete safeUser.password;
        delete safeUser.__v;

        return res.status(201).send(safeUser);
    } catch(e) {
        res.status(500).send("Error creating user.");
    }
};

export default signup;