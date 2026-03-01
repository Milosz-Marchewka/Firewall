import Guest from "../../db/Guest.js";
import User from "../../db/User.js";
import jwt from 'jsonwebtoken';

export const getUserAbilities = async (req, res)=>{
    const token = req.cookies?.auth;
    try{
        const uid = token ? jwt.verify(token, process.env.JWT_SECRET)?.id : null;
        
        const user = uid ? await User.findOne({_id: uid}) : null;
        let guest = null;
        if(!user){
            guest = await Guest.findOne({_id: uid});
            if(!guest){
                return res.status(404).send("User not found");
            }
        }
        const source = user || guest;
        const codes = Array.isArray(source?.abilities) ? source.abilities.map(a => a?.code) : [];
        return res.status(200).json(user?.abilities || guest?.abilities);
    }catch(e){
        console.log("getUserAbilities error", e);
        return res.status(500).send("Internal server error");
        
    }
};