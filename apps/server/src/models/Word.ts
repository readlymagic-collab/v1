import mongoose, { Schema, Document } from 'mongoose';

export interface IWord extends Document {
  text: string;
  type: 'phonetic' | 'sight' | 'challenge';
  level: number;
  phase: 1 | 2 | 3;
  phaseLabel?: string; // e.g. "Beginning of Year (Sept-Nov)"
  audioUrl?: string;
  tags: string[];
  createdAt: Date;
}

const WordSchema: Schema = new Schema({
  text: { type: String, required: true, trim: true },
  type: { 
    type: String, 
    enum: ['phonetic', 'sight', 'challenge'], 
    default: 'sight' 
  },
  level: { 
    type: Number, 
    required: true,
    default: 0
  },
  phase: { 
    type: Number, 
    enum: [1, 2, 3],
    default: 1
  },
  phaseLabel: { type: String },
  audioUrl: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Compound index to prevent duplicate words in the SAME level/phase
WordSchema.index({ text: 1, level: 1, phase: 1 }, { unique: true });

export default mongoose.model<IWord>('Word', WordSchema);
