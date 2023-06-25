import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';

import { ISigninRequestBody, ISignupRequestBody } from './interfaces/IAuth';
import User from '../models/user';
import { TypedRequestBody } from './interfaces/utils';

export const signup = async (
  req: TypedRequestBody<ISignupRequestBody>,
  res: Response,
) => {
  const { name, email, password }: ISignupRequestBody = req.body;

  const user = await User.findOne({ email: email }).exec();
  if (user) {
    return res.status(400).json({
      error: 'Email is taken',
    });
  }

  const username = uuidv4();
  const profile = `${process.env.CLIENT_URL}/profile/${username}}`;

  try {
    await new User({
      name,
      email,
      password,
      profile,
      username,
    }).save();

    res.json({
      message: 'Signup success! Please signin.',
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  return res;
};

export const signin = async (
  req: TypedRequestBody<ISigninRequestBody>,
  res: Response,
) => {
  const { email, password } = req.body;
  // Check if user exist
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup.',
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match.',
      });
    }
    // generate a token and sent to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    res.cookie('token', token, { expires: expirationDate });

    const { _id, username, name, role } = user;
    return res.json({
      token,
      user: { _id, username, name, role, email: user.email },
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
  return res;
};

export const signout = (
  _req: TypedRequestBody<ISigninRequestBody>,
  res: Response,
) => {
  res.clearCookie('token');
  res.json({
    message: 'Signout success',
  });
};

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ['HS256'],
});
