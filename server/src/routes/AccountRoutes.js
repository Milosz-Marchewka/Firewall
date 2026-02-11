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

const accountRoutes = Router();

accountRoutes.get("/auth", requireAuth, async (req, res)=>{
    try {
        const user = await User.findById(req.user._id).select('-password -__v');
        if (user) {
            return res.json({
                id: user._id,
                username: user.username,
                email: user.email,
                points: user.points,
                level: user.level,
                levelPoints: user.levelPoints,
            });
        }

        const guest = await Guest.findById(req.user._id).select('-password -__v');
        if (guest) {
            return res.json({
                id: guest._id,
                username: guest.username,
                email: guest.email,
                points: guest.points,
                level: guest.level,
                levelPoints: guest.levelPoints,
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