import { Router } from 'express';
import { getRooms, getRoom } from '../controllers/roomController.js';
const router = Router();

router.get('/rooms', getRooms);
router.get('/room/:roomSlug', getRoom);

export default router;
