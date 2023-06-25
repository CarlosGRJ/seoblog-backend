import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  profile: string;
  hashed_password: string;
  salt: string;
  about: string;
  role: string;
  photo: {
    data: Buffer;
    contentType: string;
  };
  resetPasswordLink: {
    data: string;
    default: string;
  };
}
