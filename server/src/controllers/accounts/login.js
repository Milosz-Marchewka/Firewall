import User from "../../db/User.js";
import bcrypt from 'bcrypt';
import { makeJwtToken } from "./makeJwtToken.js";

const login = async (req, res)=>{
    if((!req.body.email && !req.body.username) || !req.body.password){
        return res.status(400).send("All fields are required.");
    }
    try{
        const user = await User.findOne(req.body.email ? 
            { email: req.body.email } : 
            { username: req.body.username });
        
        if(!user){
            return res.status(401).send("User not found.");
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordValid){
            return res.status(401).send("Invalid password.");
        }

        res.cookie("auth", makeJwtToken(user._id), {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        const safeUser = user.toObject();
        delete safeUser.password;
        delete safeUser.__v;

        console.log(safeUser);
        
        return res.status(200).send(safeUser);
    } catch (error) {
        return res.status(500).send("Server error.");
    }
}

export default login;