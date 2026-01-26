import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next)=>{
    const token = req.cookies?.auth;
    if(!token) return res.status(401).send("Unauthorized");
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: payload.id };
        next();
    }catch(e){
        return res.status(401).send("Unauthorized");
    }
}

export default requireAuth;