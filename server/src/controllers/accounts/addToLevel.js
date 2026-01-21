import User from "../../db/User.js";

const addtoLevel = async (req, res)=>{
    if(!req.body?.uid || !req.body?.xp){
        return res.status(400).send("User ID or XP amount missing");
    }

    const user = await User.findOne({"_id": req.body.uid});
    if(!user){
        return res.status(400).send("User not found");
    }

    const currentLevel = user.level;
    const currentProgress = user.levelPoints;
    const ceil = Math.ceil(1.25*user.level);
    if(currentProgress + req.body.xp >= ceil){
        const overflow = ceil - (currentProgress + req.body.xp);
        user.levelPoints = overflow;
        user.level = currentLevel + 1;
    } else {
        user.levelPoints = currentProgress + req.body.xp;
    }

    return res.status(200).json({});
}

export default addtoLevel;