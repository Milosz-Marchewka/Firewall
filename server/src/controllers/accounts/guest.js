import Guest from "../../db/Guest.js"
import { makeJwtToken } from "./makeJwtToken.js";

const guest = async (req, res)=>{
    const guest = new Guest({});
    try{
        guest.save();
        res.cookie("auth", makeJwtToken(guest._id), {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 // 24h for guest
        });

        const safeUser = guest.toObject();
        delete safeUser.password;
        delete safeUser.__v;

        return res.status(200).send(safeUser);
    } catch(e){
       res.status(500).send("Server error");
    }
}

export default guest;