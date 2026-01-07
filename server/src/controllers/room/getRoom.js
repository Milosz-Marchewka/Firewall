import Game from "../../db/Game.js";

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getRoom = async (req, res)=>{
    try{
        const { url } = req.params;
        const tokenRegex = new RegExp(`/room/${escapeRegex(url)}$`);
        const room = await Game.findOne({ url: { $regex: tokenRegex } });
        if(!room){
            return res.status(404).send("Room not found.");
        } else {
            res.status(200).json({room}); 
        }
    } catch(err){
        res.status(500).send("Error retrieving room.");
    }
}