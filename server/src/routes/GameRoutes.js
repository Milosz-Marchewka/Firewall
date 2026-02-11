import { Router } from 'express';
import { createRoom, getRoom, play} from '../controllers/room/index.js';
import { getAbilities } from '../controllers/abilities/getAbilities.js';
import { getEndScreenData } from '../controllers/room/getEndScreenData.js';
import buyAbility from '../controllers/abilities/buyAbility.js';
const gameRoutes = Router();

gameRoutes.post("/room", createRoom);
gameRoutes.get("/room/:url", getRoom);
gameRoutes.post("/play", play);
gameRoutes.get("/abilities", getAbilities);
gameRoutes.post("/buyAbility", buyAbility);
gameRoutes.get("/endData", getEndScreenData);

export default gameRoutes;
