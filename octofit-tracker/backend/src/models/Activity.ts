import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<IActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'hiking', 'weightlifting', 'yoga', 'other'],
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
    },
    calories: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
