import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { connectDB } from './src/db/Connection.js';
import { add } from './src/temp/addAbilities.js';
import gameRoutes from './src/routes/GameRoutes.js';
import accountRoutes from './src/routes/AccountRoutes.js';
import createIo from './src/websocket/io.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', gameRoutes);
app.use('/api/account', accountRoutes);

dotenv.config();
connectDB(process.env.URI);

const PORT = 5000;
const httpServer = createServer(app);
const io = createIo(httpServer);
app.set('io', io);
httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on port ${PORT}`);
});