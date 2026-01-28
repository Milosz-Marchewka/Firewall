import { Router } from 'express';
import requireAuth from '../controllers/accounts/requireAuth.js';
import signup from '../controllers/accounts/signup.js';
import login from '../controllers/accounts/login.js';
import addtoLevel from '../controllers/accounts/addToLevel.js';
import guest from '../controllers/accounts/guest.js';
import { getUserAbilities } from '../controllers/abilities/getUserAbilities.js';

const accountRoutes = Router();

accountRoutes.get("/auth", requireAuth, (req, res)=>{
    res.json({id: req.user._id});
});
accountRoutes.post("/signup", signup);
accountRoutes.post("/login", login);
accountRoutes.post("/level", addtoLevel);
accountRoutes.post("/guest", guest);
accountRoutes.post("/abilities", getUserAbilities);
export default accountRoutes;