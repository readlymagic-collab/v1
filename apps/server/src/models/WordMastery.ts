import mongoose, { Schema, Document } from 'mongoose';

export interface IWordMastery extends Document {
  studentId: mongoose.Types.ObjectId;
  wordId: mongoose.Types.ObjectId;
  attempts: number;
  successes: number;
  isMastered: boolean;
  lastAttempted: Date;
}

const WordMasterySchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  wordId: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
  attempts: { type: Number, default: 0 },
  successes: { type: Number, default: 0 },
  isMastered: { type: Number, default: false },
  lastAttempted: { type: Date, default: Date.now }
});

// Index to quickly find word status for a specific student
WordMasterySchema.index({ studentId: 1, wordId: 1 }, { unique: true });

export default mongoose.model<IWordMastery>('WordMastery', WordMasterySchema);
