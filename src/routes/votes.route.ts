import { Router } from 'express';
import { voteForSong } from '../controllers/vote.controller';

const router = Router();

router.post('/', voteForSong);

export default router;