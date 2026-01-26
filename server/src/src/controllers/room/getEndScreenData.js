import Game from "../../db/Game.js";

export const getEndScreenData = async (req, res)=>{
    if([req.query?.token].some(p=>!p)) return res.status(400).send("Missing game token");

    const game = await Game.findOne({url: req.query?.token});
    if(!game){
        return res.status(400).send("Game not found");
    }
    
    const ret = {
        winner: game.winner,
        timeElapsed: game.timeElapsed,
        numberOfTurns: game.turnNumber
    }

    return res.status(200).json(ret);
}