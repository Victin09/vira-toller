import { Request, Response, NextFunction } from 'express';

export default async (req: Request, _res: Response, next: NextFunction) => {
  if (req.cookies.token) {
    const token = await req.cookies.token;
    req.headers.authorization = `Bearer ${token}`;
  }

  next();
};
