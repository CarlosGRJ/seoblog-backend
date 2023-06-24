import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  profile: string;
  hashed_password: string;
  salt: string;
  about: string;
  role: number;
  photo: {
    data: Buffer;
    contentType: string;
  };
  resetPasswordLink: {
    data: string;
    default: string;
  };
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    profile: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true },
);

export default model<IUser>('User', UserSchema);
