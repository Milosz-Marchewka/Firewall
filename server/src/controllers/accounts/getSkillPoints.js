import User from "../../db/User.js";

const getSkillPoints = async (req, res)=>{
    if(!req.body?.id){
        return res.status(400).send("Bad request");
    }
    try{
        const user = await User.findOne({_id: req.body.id});
        if(!user){
            return res.status(404).send("User not found");
        }
        return res.status(200).json({points: user.points});
    } catch(e){
        return res.status(500).send("Internal server error");
    }
}