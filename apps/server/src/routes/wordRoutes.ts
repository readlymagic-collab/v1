import { Router } from 'express';
import { getWords, createWord, updateWord, deleteWord, bulkUploadWords } from '../controllers/wordController';
import { protectAdmin } from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/temp/' });

const router = Router();

// Publicly readable for students, but protected for creation/deletion
router.get('/', getWords);

// Admin only routes
router.post('/', protectAdmin, createWord);
router.post('/bulk', protectAdmin, upload.single('file'), bulkUploadWords);
router.put('/:id', protectAdmin, updateWord);
router.delete('/:id', protectAdmin, deleteWord);

export default router;
