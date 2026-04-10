import { Schema, model, Document } from 'mongoose';

export interface ISession extends Document {
  level: number;
  score: number;
  total: number;
  accuracy: number;
  timestamp: Date;
}

const SessionSchema = new Schema<ISession>({
  level: { type: Number, required: [true, 'Level is required'] },
  score: { type: Number, required: [true, 'Score is required'] },
  total: { type: Number, required: [true, 'Total is required'] },
  accuracy: { type: Number, required: [true, 'Accuracy is required'] },
  timestamp: { type: Date, default: Date.now },
});

export default model<ISession>('Session', SessionSchema);
