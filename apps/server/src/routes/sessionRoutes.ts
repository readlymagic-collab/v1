import { Router } from 'express';
import { saveSession, getHistory, getStats } from '../controllers/sessionController';
import { validate } from '../middleware/validateMiddleware';
import { sessionSchema } from '../utils/schemas';

const router = Router();

router.route('/')
  .post(validate(sessionSchema), saveSession)
  .get(getHistory);

router.get('/stats', getStats);

export default router;
