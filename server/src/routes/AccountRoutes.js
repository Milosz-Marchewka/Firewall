import { Router } from 'express';
import requireAuth from '../controllers/accounts/requireAuth.js';
import signup from '../controllers/accounts/signup.js';
import login from '../controllers/accounts/login.js';
import addtoLevel from '../controllers/accounts/addToLevel.js';
import guest from '../controllers/accounts/guest.js';
import logout from '../controllers/accounts/logout.js';
import { getUserAbilities } from '../controllers/abilities/getUserAbilities.js';
import User from '../db/User.js';
import Guest from '../db/Guest.js';
import { determineRank } from '../controllers/accounts/getRank.js';

const accountRoutes = Router();

const normalizeLevelState = async (account) => {
    if (!account) return { changed: false };

    const SKILL_POINTS_PER_LEVEL = 1;
    let level = Number(account.level ?? 0);
    let progress = Number(account.levelPoints ?? 0);
    let points = Number(account.points ?? 0);

    if (!Number.isFinite(level) || level < 0) level = 0;
    if (!Number.isFinite(progress) || progress < 0) progress = 0;
    if (!Number.isFinite(points) || points < 0) points = 0;

    let levelsGained = 0;
    for (let i = 0; i < 100; i++) {
        const required = Math.max(1, Math.ceil(1.25 * level));
        if (progress < required) break;
        progress -= required;
        level += 1;
        levelsGained += 1;
    }

    const changed = level !== Number(account.level ?? 0)
        || progress !== Number(account.levelPoints ?? 0)
        || points !== Number(account.points ?? 0)
        || levelsGained > 0;

    if (levelsGained > 0) {
        points += (levelsGained * SKILL_POINTS_PER_LEVEL);
    }

    const shouldPersist = level !== Number(account.level ?? 0)
        || progress !== Number(account.levelPoints ?? 0)
        || points !== Number(account.points ?? 0);

    if (shouldPersist) {
        account.level = level;
        account.levelPoints = progress;
        account.points = points;
        await account.save();
    }

    return { changed, level, levelPoints: progress, points };
};

accountRoutes.get("/auth", requireAuth, async (req, res)=>{
    try {
        const user = await User.findById(req.user._id).select('-password -__v');
        if (user) {
            await normalizeLevelState(user);
            return res.json({
                id: user._id ?? -1,
                username: user.username ?? "error",
                email: user.email,
                points: user.points,
                level: user.level,
                levelPoints: user.levelPoints,
                rank: determineRank(user.level)
            });
        }

        const guest = await Guest.findById(req.user._id).select('-password -__v');
        if (guest) {
            await normalizeLevelState(guest);
            return res.json({
                id: guest._id,
                username: `Guest ${guest.id}`,
                email: guest.email,
                points: guest.points,
                level: guest.level,
                levelPoints: guest.levelPoints,
                rank: determineRank(guest.level)
            });
        }

        return res.status(404).send("User not found");
    } catch {
        return res.status(500).send("Server error");
    }
});
accountRoutes.post("/signup", signup);
accountRoutes.post("/login", login);
accountRoutes.post("/level", addtoLevel);
accountRoutes.post("/guest", guest);
accountRoutes.post("/abilities", getUserAbilities);
accountRoutes.post("/logout", logout);
export default accountRoutes;