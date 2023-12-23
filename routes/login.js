import { Router } from 'express';
import { getLogin, postLogin, getLogout } from '../controllers/loginController.js';
const router = Router();
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/logout', getLogout);

export default router;
