import mongoose, { model, Schema } from 'mongoose';

import { IUser } from './user.model';

export interface IWorkspace extends Document {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  users: IUser[];
}

const workspaceSchema: Schema<IWorkspace> = new mongoose.Schema({
  _id: {
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
  users: [
    {
      type: String,
      ref: 'User',
    },
  ],
});

const WorkspaceModel = model<IWorkspace>('Workspace', workspaceSchema, 'workspaces');

export default WorkspaceModel;
