import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songRoutes from './routes/songs.route';
import votesRoute from "./routes/votes.route";
import searchRoute from "./routes/search.route";
import oauthRouter from './routes/oauth.route';
import passport from "passport";
import '../lib/passport';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/votes', votesRoute);
app.use('/songs', songRoutes);
app.use('/search',searchRoute);
app.use(passport.initialize());
console.log('GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET', process.env.GOOGLE_CLIENT_SECRET);
app.use('/oauth', oauthRouter);

export default app;
