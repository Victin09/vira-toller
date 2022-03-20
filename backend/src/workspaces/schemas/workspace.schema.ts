import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';

export type WorkspaceDocument = Workspace & Document;

@Schema()
export class Workspace {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ required: true, type: String, ref: 'User' })
  owner: User;

  @Prop({
    required: true,
    type: [{ type: String, ref: 'User' }],
  })
  members: User[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
