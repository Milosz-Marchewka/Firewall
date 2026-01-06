import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { connectDB } from './src/db/Connection.js';
import gameRoutes from './src/routes/GameRoutes.js';
import createIo from './src/websocket/io.js';

// express, mongo and dotenv setup
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB(process.env.URI);
const PORT = 5000;

app.use('/api', gameRoutes);

// http server setup

const httpServer = createServer(app);

const io = createIo(httpServer);
app.set('io', io);

httpServer.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});