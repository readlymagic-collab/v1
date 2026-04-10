import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import { apiLimiter } from './middleware/rateLimitMiddleware';
import sessionRoutes from './routes/sessionRoutes';
import adminRoutes from './routes/adminRoutes';
import wordRoutes from './routes/wordRoutes';

import path from 'path';
import fs from 'fs';

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads/words');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Security & Utility Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow cross-origin audio loading
}));
app.use(apiLimiter);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static Files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routing
app.use('/api/sessions', sessionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/words', wordRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
