import mongoose, { model, Schema } from 'mongoose';

import { IUser } from './user.model';
import { IWorkspace } from './workspace.model';

export interface IBoard {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  workspace: IWorkspace;
  users: IUser[];
}

const boardSchema: Schema<IBoard> = new Schema({
  id: {
    type: String,
    // _id: false,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  workspace: {
    type: String,
    ref: 'Workspace',
  },
  users: [
    {
      type: String,
      ref: 'User',
    },
  ],
});

const workspaceModel = model<IBoard>('Board', boardSchema, 'boards');

export default workspaceModel;
