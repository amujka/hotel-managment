import { Router } from 'express';
import { getRooms } from '../controllers/roomController.js';
const router = Router();

router.get('/rooms', getRooms);

export default router;
