import { Request, Response } from 'express';

import userSchema, { IUser } from '../models/user.model';

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users: IUser[] = await userSchema.find().select('-password');
    res.status(200).json({
      success: true,
      message: 'Users list',
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error listing users',
    });
  }
};
