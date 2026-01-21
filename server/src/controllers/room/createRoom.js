import Game from "../../db/Game.js";
import { createURL, URL_BASE } from "../../utils.js";

export const createRoom = async (req, res)=>{
    try{
        const roomUrl = createURL(`${URL_BASE}/room`);

        const room = new Game({
            url: roomUrl,
            defender: { id: null },
            attacker: { id: null }
        });

        await room.save();
        res.status(200).json({roomUrl});
    } catch (err){
        res.status(500).send(err.message);
    }
}