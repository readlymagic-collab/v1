import { Request, Response } from 'express';
import { SessionService } from '../services/sessionService';

export const saveSession = async (req: Request, res: Response) => {
  const session = await SessionService.createSession(req.body);
  res.status(201).json({ success: true, data: session });
};

export const getHistory = async (req: Request, res: Response) => {
  const history = await SessionService.getHistory();
  res.json({ success: true, data: history });
};

export const getStats = async (req: Request, res: Response) => {
  const stats = await SessionService.getGlobalStats();
  res.json({ success: true, data: stats });
};
