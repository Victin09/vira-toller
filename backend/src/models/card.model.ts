import { model, Model, Schema } from 'mongoose';

import { IList } from './list.model';
import { IUser } from './user.model';

export interface ICard {
  id: string;
  name: string;
  description: string;
  order: number;
  list: IList;
  responsibles: IUser;
}

const cardSchema: Schema<ICard> = new Schema({
  id: {
    type: String,
    // _id: false,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  list: {
    type: String,
    ref: 'List',
    required: true,
  },
  responsibles: [
    {
      type: String,
      ref: 'User',
    },
  ],
});

const cardModel: Model<ICard> = model<ICard>('Card', cardSchema, 'cards');

export default cardModel;
