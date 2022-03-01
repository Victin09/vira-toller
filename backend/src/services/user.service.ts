import { Request, Response } from 'express';

import userSchema, { IUser } from '../models/user.model';

// List users
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

// Find user by id
export const findUserById = async (req: Request, res: Response) => {
  try {
    const user: IUser = await userSchema.findById(req.params.id).select('-password');
    res.status(200).json({
      success: true,
      message: 'User found',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting user',
    });
  }
};

// Find user by email
export const findUserByEmail = async (req: Request, res: Response) => {
  try {
    const user: IUser = await userSchema.findOne({ email: req.params.email }).select('-password');
    res.status(200).json({
      success: true,
      message: 'User found',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting user',
    });
  }
};

// Find user by username
export const findUserByUsername = async (req: Request, res: Response) => {
  try {
    const user: IUser = await userSchema.findOne({ username: req.params.username }).select('-password');
    res.status(200).json({
      success: true,
      message: 'User found',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting user',
    });
  }
};

// Find user by id and update
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const user: IUser = await userSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: 'User updated',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
    });
  }
};

// Find user by id and delete
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    await userSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'User deleted',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
    });
  }
};
