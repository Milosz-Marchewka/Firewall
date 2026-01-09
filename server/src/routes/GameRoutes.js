import { Router } from 'express';
import { createRoom, getRoom, quickPlay } from '../controllers/room/index.js';
const gameRoutes = Router();

gameRoutes.post("/room", createRoom);
gameRoutes.post("/quickplay", quickPlay);
gameRoutes.get("/room/:url", getRoom);

export default gameRoutes;
