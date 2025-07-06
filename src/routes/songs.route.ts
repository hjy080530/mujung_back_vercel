import { Router } from 'express';

import {createSong, getSongs} from "../controllers/songs.controller";

const router = Router();

router.post('/', createSong);
router.get('/', getSongs);

export default router;