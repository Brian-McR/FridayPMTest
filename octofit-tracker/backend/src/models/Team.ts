import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  leader: Types.ObjectId;
  createdDate: Date;
  totalScore: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    leader: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITeam>('Team', teamSchema);
