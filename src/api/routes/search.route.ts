import { Router } from 'express';
import { searchSong } from '../controllers/search.controller';
const router = Router();
router.get('/', searchSong);
export default router;