import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const makeJwtToken = (payload, expiresIn = '7d') =>{
    return jwt.sign({id: payload._id}, process.env.JWT_SECRET, {expiresIn});
}