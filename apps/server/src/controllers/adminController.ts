import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== config.admin.username) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, config.admin.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ role: 'admin' }, config.admin.jwtSecret, {
    expiresIn: '1d',
  });

  res.json({ success: true, token });
};

export const verifyToken = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Token is valid' });
};
