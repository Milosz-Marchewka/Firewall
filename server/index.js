import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
connectDB(process.env.URI);
const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
});