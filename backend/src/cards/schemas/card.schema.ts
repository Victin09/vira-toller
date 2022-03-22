import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/schemas/user.schema';
import { List } from 'src/lists/schemas/list.schema';
import { Board } from 'src/boards/schemas/board.schema';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  code: string;

  @Prop({
    type: String,
    default: '',
  })
  description: string;

  @Prop({
    type: Number,
    default: 0,
  })
  order: number;

  @Prop({ required: true, type: String, ref: 'User' })
  users: User[];

  @Prop({ required: true, type: String, ref: 'List' })
  list: List;

  @Prop({ required: true, type: String, ref: 'Board' })
  board: Board;

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

  @Prop({
    type: Date,
    default: Date.now,
  })
  dueDate: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
