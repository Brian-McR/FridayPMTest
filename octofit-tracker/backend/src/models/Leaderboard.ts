import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  rank: number;
  totalScore: number;
  activitiesCount: number;
  level: string;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    rank: {
      type: Number,
      required: true,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    activitiesCount: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      default: 'bronze',
      enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
    },
  },
  { timestamps: true }
);

// Index for efficient ranking queries
leaderboardSchema.index({ rank: 1 });
leaderboardSchema.index({ totalScore: -1 });

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
