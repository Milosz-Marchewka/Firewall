import User from "../../db/User.js";
import bcrypt from 'bcrypt';
import { makeJwtToken } from "./makeJwtToken.js";
import { clearCookies } from "../../utils.js";
import { determineRank } from "./getRank.js";

const login = async (req, res)=>{
    if((!req.body.email && !req.body.username) || !req.body.password){
        return res.status(400).send("All fields are required.");
    }
    try{
        const user = await User.findOne(req.body.email ? 
            { email: req.body.email } : 
            { username: req.body.username });
        
        if(!user){
            return res.status(404).send("User not found.");
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordValid){
            return res.status(401).send("Invalid password.");
        }

        clearCookies(req.cookies, res);

        res.cookie("auth", makeJwtToken({id: user._id, username: user.username}), {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            path: '/api/account',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        const safeUser = user.toObject();
        safeUser.rank = determineRank(safeUser.level);
        delete safeUser.password;
        delete safeUser.__v;

        console.log(safeUser);
        
        
        return res.status(200).send(safeUser);
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).send("Server error.");
    }
}

export default login;