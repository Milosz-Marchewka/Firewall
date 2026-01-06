import { Router } from 'express';
import { createRoom, getRoom } from '../controllers/room/index.js';
const gameRoutes = Router();

gameRoutes.post("/room", createRoom);
gameRoutes.get("/room/:url", getRoom);

export default gameRoutes;