import { Request, Response } from 'express';
import { ISignupRequestBody } from './interfaces/IAuth';

export const signup = (req: Request, res: Response) => {
  const { name, email, password }: ISignupRequestBody = req.body;
  res.json({
    user: { name, email, password },
  });
};
