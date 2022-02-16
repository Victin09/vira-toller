import { Request, Response } from 'express';

import listSchema, { IList } from '../models/list.model';

// Get list of lists by board id
export const getListsByBoardId = async (req: Request, res: Response) => {
  try {
    const lists: IList[] = await listSchema.find({ boardId: req.params.id }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Lists found',
      data: lists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting lists',
    });
  }
};

// Get list of lists by user id
export const getListsByUserId = async (req: Request, res: Response) => {
  try {
    const lists: IList[] = await listSchema.find({ assigned: req.params.id }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Lists found',
      data: lists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting lists',
    });
  }
};

// Create list
export const createList = async (req: Request, res: Response) => {
  try {
    const list: IList = await listSchema.create(req.body);
    res.status(200).json({
      success: true,
      message: 'List created',
      data: list,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating list',
    });
  }
};

// Update list
export const updateList = async (req: Request, res: Response) => {
  try {
    const list: IList = await listSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: 'List updated',
      data: list,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating list',
    });
  }
};

// Change lists order
export const changeListsOrder = async (req: Request, res: Response) => {
  try {
    const lists: IList[] = await listSchema.find({ boardId: req.params.id });
    const listsOrder: string[] = req.body;
    const listsOrderUpdated: IList[] = [];

    listsOrder.forEach((listId: string) => {
      const list: IList = lists.find((list: IList) => list.id === listId);
      listsOrderUpdated.push(list);
    });

    await listSchema.updateMany({ boardId: req.params.id }, { $set: { order: listsOrderUpdated } });
    res.status(200).json({
      success: true,
      message: 'Lists order updated',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating lists order',
    });
  }
};

// Delete list
export const deleteList = async (req: Request, res: Response) => {
  try {
    await listSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'List deleted',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting list',
    });
  }
};
