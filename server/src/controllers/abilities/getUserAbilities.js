import Guest from "../../db/Guest.js";
import User from "../../db/User.js";
import jwt from 'jsonwebtoken';

export const getUserAbilities = async (req, res)=>{
    const uid = jwt.verify(req.headers.cookie.replace("auth=", ""), process.env.JWT_SECRET).id;
    
    const user = await User.findOne({_id: uid});
    let guest = null;
    if(!user){
        guest = await Guest.findOne({_id: uid});
        if(!guest){
            return res.status(404).send("User not found");
        }
    }
    return res.status(200).json(user?.abilities || guest?.abilities);
};