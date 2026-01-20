import { Router } from 'express';
import requireAuth from '../controllers/accounts/requireAuth.js';
import signup from '../controllers/accounts/signup.js';
import login from '../controllers/accounts/login.js';

const accountRoutes = Router();

accountRoutes.get("/auth", requireAuth, (req, res)=>{
    res.json({id: req.user._id});
});
accountRoutes.post("/signup", signup);
accountRoutes.post("/login", login);

export default accountRoutes;