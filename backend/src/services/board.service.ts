import { Request, Response } from 'express';

import boardSchema, { IBoard } from '../models/board.model';

// Find board by id
export const findBoardById = async (req: Request, res: Response) => {
  try {
    const board: IBoard = await boardSchema.findById(req.params.id).select('-password');
    res.status(200).json({
      success: true,
      message: 'Board found',
      data: board,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting board',
    });
  }
};

// Find boards by user id
export const findBoardsByUserId = async (req: Request, res: Response) => {
  try {
    const boards: IBoard[] = await boardSchema.find({ users: req.params.id }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Boards found',
      data: boards,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting boards',
    });
  }
};

// Find boards by workspace id
export const findBoardsByWorkspaceId = async (req: Request, res: Response) => {
  try {
    const boards: IBoard[] = await boardSchema.find({ workspace: req.params.id }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Boards found',
      data: boards,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting boards',
    });
  }
};

// Create board
export const createBoard = async (req: Request, res: Response) => {
  try {
    const board: IBoard = await boardSchema.create(req.body);
    res.status(200).json({
      success: true,
      message: 'Board created',
      data: board,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating board',
    });
  }
};

// Add user to board
export const addUserToBoard = async (req: Request, res: Response) => {
  try {
    const board: IBoard = await boardSchema.findByIdAndUpdate(req.params.id, {
      $push: { users: req.body.userId },
    });
    res.status(200).json({
      success: true,
      message: 'User added to board',
      data: board,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error adding user to board',
    });
  }
};

// Remove user from board
export const removeUserFromBoard = async (req: Request, res: Response) => {
  try {
    const board: IBoard = await boardSchema.findByIdAndUpdate(req.params.id, {
      $pull: { users: req.body.userId },
    });
    res.status(200).json({
      success: true,
      message: 'User removed from board',
      data: board,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error removing user from board',
    });
  }
};

// Update board
export const updateBoard = async (req: Request, res: Response) => {
  try {
    const board: IBoard = await boardSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: 'Board updated',
      data: board,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating board',
    });
  }
};

// Delete board
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    await boardSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Board deleted',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting board',
    });
  }
};
