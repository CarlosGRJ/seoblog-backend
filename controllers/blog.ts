import { Request, Response } from 'express';

export const time = (_req: Request, res: Response) => {
  res.json({ time: Date().toString() });
};
