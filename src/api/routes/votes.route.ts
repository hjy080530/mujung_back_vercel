import { Router } from 'express';
import {requireBssmEmail} from "../auth/requireBssmEmail";
import {voteForSong} from "../controllers/vote.controller";


const router = Router();

router.post('/', voteForSong);

export default router;