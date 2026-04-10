import { Router } from 'express';
import { login, verifyToken } from '../controllers/adminController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/verify', protectAdmin, verifyToken);

export default router;
