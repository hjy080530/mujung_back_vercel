import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songRoutes from './routes/songs.route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/songs', songRoutes);

export default app;