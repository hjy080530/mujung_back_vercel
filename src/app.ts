// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import oauthRouter from './routes/oauth.route';
import searchRouter from './routes/search.route';
import songsRouter from './routes/songs.route';
import votesRouter from './routes/votes.route';
import './lib/passport';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://mujung-three.vercel.app',
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,
}));
app.options('*', cors());

app.use(express.json());
app.use(passport.initialize());

// 라우팅
app.use('/oauth', oauthRouter);
app.use('/search', searchRouter);
app.use('/songs', songsRouter);
app.use('/votes', votesRouter);

export default app;