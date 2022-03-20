import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/schemas/user.schema';
import { Workspace } from '../../workspaces/schemas/workspace.schema';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: String, ref: 'User' })
  users: User[];

  @Prop({ required: true, type: String, ref: 'Workspace' })
  workspace: Workspace;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
