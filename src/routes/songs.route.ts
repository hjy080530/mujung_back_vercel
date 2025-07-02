import { Router } from 'express';

import {requireBssmEmail} from "../auth/requireBssmEmail";
import {createSong} from "../controllers/songs.controller";

const router = Router();

router.post('/',requireBssmEmail, createSong);

export default router;