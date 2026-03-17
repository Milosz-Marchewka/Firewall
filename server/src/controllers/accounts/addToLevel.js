import User from "../../db/User.js";

const addtoLevel = async (req, res)=>{
    if(!req.body?.uid || !req.body?.xp){
        return res.status(400).send("User ID or XP amount missing");
    }

    const user = await User.findOne({"_id": req.body.uid});
    if(!user){
        return res.status(400).send("User not found");
    }

    let currentLevel = Number(user.level ?? 0);
    let currentProgress = Number(user.levelPoints ?? 0);
    let remainingXp = Number(req.body.xp ?? 0);
    let pointsEarned = 0;
    const skillPointsForLevel = (level) => Math.max(1, Math.floor(level / 10) + 1);

    if (!Number.isFinite(currentLevel) || currentLevel < 0) currentLevel = 0;
    if (!Number.isFinite(currentProgress) || currentProgress < 0) currentProgress = 0;
    for (let i = 0; i < 100; i++) {
        const required = Math.max(1, Math.ceil(1.25 * currentLevel));
        if (currentProgress < required) break;
        currentProgress -= required;
        currentLevel += 1;
        pointsEarned += skillPointsForLevel(currentLevel);
    }

    if (!Number.isFinite(remainingXp) || remainingXp <= 0) {
        return res.status(400).send("XP amount must be positive");
    }
    while (remainingXp > 0) {
        const required = Math.max(1, Math.ceil(1.25 * currentLevel));
        const toLevel = required - currentProgress;

        if (remainingXp >= toLevel) {
            remainingXp -= toLevel;
            currentLevel += 1;
            currentProgress = 0;
            pointsEarned += skillPointsForLevel(currentLevel);
        } else {
            currentProgress += remainingXp;
            remainingXp = 0;
        }
    }

    user.level = currentLevel;
    user.levelPoints = currentProgress;
    if (pointsEarned > 0) {
        user.points = Number(user.points ?? 0) + pointsEarned;
    }

    await user.save();

    return res.status(200).json({});
}

export default addtoLevel;