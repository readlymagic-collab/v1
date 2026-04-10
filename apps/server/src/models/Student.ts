import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  avatarUrl?: string;
  currentLevel: number; // 0, 1, 2, 3...
  currentPhase: number; // 1, 2, 3
  parentId: mongoose.Types.ObjectId;
  stats: {
    wordsMastered: number;
    sessionsCompleted: number;
    totalReadingTime: number;
  };
  createdAt: Date;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  avatarUrl: { type: String },
  currentLevel: { 
    type: Number, 
    default: 0
  },
  currentPhase: { 
    type: Number, 
    default: 1
  },
  parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  stats: {
    wordsMastered: { type: Number, default: 0 },
    sessionsCompleted: { type: Number, default: 0 },
    totalReadingTime: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IStudent>('Student', StudentSchema);
