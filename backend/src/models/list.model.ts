import { model, Model, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface IList {
  id: string;
  name: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  assigned: IUser[];
  boardId: string;
}

const listSchema: Schema<IList> = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  assigned: [
    {
      type: String,
      ref: 'User',
    },
  ],
  boardId: {
    type: String,
    required: true,
    ref: 'Board',
  },
});

const listModel: Model<IList> = model<IList>('List', listSchema, 'lists');

export default listModel;
