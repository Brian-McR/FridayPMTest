import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  user: Types.ObjectId;
  name: string;
  type: string;
  duration: number;
  difficulty: string;
  description: string;
  exercises: Array<{
    name: string;
    reps?: number;
    sets?: number;
    duration?: number;
  }>;
  createdDate: Date;
  completed: boolean;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['cardio', 'strength', 'flexibility', 'mixed'],
    },
    duration: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    description: {
      type: String,
      required: true,
    },
    exercises: [
      {
        name: String,
        reps: Number,
        sets: Number,
        duration: Number,
      },
    ],
    createdDate: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
