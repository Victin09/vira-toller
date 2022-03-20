import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../boards/schemas/board.schema';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  order: number;

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
}

export const ListSchema = SchemaFactory.createForClass(List);
