import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const makeJwtToken = (payload, expiresIn = '7d') =>{
    const id = typeof payload === 'string'
        ? payload
        : (payload?.id ?? payload?._id);

    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn});
}