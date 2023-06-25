import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import { IUser } from './interfaces/IUser';

const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxLength: 42,
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
      type: String,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: {
        type: String,
        default: '',
      },
    },
  },
  { timestamps: true },
);

interface IUserModel extends IUser {
  _password: string;
  makeSalt(): string;
  encryptPassword(password: string): string;
  authenticate(plainText: string): string;
}

UserSchema.virtual('password')
  .set(function (this: IUserModel, password) {
    // create temporarity variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encryptPassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (this: IUserModel, plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (this: IUserModel, password: string) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (error) {
      return '';
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
};

const User = model<IUserModel>('User', UserSchema);

export default User;
