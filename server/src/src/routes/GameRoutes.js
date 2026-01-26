import { Router } from 'express';
import { createRoom, getRoom, quickPlay } from '../controllers/room/index.js';
import { getAbilities } from '../controllers/abilities/getAbilities.js';
import { getEndScreenData } from '../controllers/room/getEndScreenData.js';
const gameRoutes = Router();

gameRoutes.post("/room", createRoom);
gameRoutes.get("/room/:url", getRoom);
gameRoutes.post("/quickplay", quickPlay);
gameRoutes.get("/abilities", getAbilities);
gameRoutes.get("/endData", getEndScreenData);

export default gameRoutes;
