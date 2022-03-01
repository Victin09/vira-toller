import { Request, Response } from 'express';

import cardSchema from '../models/card.model';

// Get cards by board id
export const getCardsByBoardId = async (req: Request, res: Response) => {
  try {
    const cards: any = await cardSchema.find({ boardId: req.params.id }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Cards found',
      data: cards,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting cards',
    });
  }
}

// Get cards by user id
export const getCardsByUserId = async (req: Request, res: Response) => {
  try {
    const cards: any = await cardSchema.find({ assigned: req.params.id }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Cards found',
      data: cards,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting cards',
    });
  }
}

// Create card
export const createCard = async (req: Request, res: Response) => {
  try {
    const card: any = await cardSchema.create(req.body);
    res.status(200).json({
      success: true,
      message: 'Card created',
      data: card,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating card',
    });
  }
}

// Update card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const card: any = await cardSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: 'Card updated',
      data: card,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating card',
    });
  }
}

// Update all cards order by list id
export const updateCardsOrder = async (req: Request, res: Response) => {
  try {
    const cards: any = await cardSchema.updateMany({ listId: req.params.id }, { order: req.body.order });
    res.status(200).json({
      success: true,
      message: 'Cards order updated',
      data: cards,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating cards order',
    });
  }
}

// Change card list
export const changeCardList = async (req: Request, res: Response) => {
  try {
    const card: any = await cardSchema.findByIdAndUpdate(req.params.id, { listId: req.body.listId }, { new: true });
    res.status(200).json({
      success: true,
      message: 'Card list updated',
      data: card,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating card list',
    });
  }
}

// Delete card
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const card: any = await cardSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Card deleted',
      data: card,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting card',
    });
  }
}
