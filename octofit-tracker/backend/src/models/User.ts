import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  name: string;
  profilePicture?: string;
  joinedDate: Date;
  totalActivities: number;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    totalActivities: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
