import { Request, Response } from 'express';

export const time = (req: Request, res: Response) => {
  res.json({ time: Date().toString() });
};
