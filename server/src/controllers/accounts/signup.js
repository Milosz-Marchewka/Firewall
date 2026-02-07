import User from "../../db/User.js";
import bcrypt from 'bcrypt';
import { makeJwtToken } from "./makeJwtToken.js";
import { validateEmail, validateUsername, validatePassword, clearCookies } from "../../utils.js";

const signup = async (req, res) => {
    if([req.body.username, req.body.email, req.body.password].some(f => !f)){
        return res.status(400).send("All fields are required.");
    }
    if (!validateUsername(req.body.username) || !validateEmail(req.body.email) || !validatePassword(req.body.password)) {
        return res.status(400).send("Username, email, or password does not match the required format.");
    }
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
        delete safeUser.password;
        delete safeUser.__v;

        return res.status(201).send(safeUser);
    } catch(e) {
        res.status(500).send("Error creating user.");
    }
};

export default signup;