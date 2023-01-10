import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { Gift } from 'src/gifts/schemas/gift.schema';

export type CenterDocument = Center & Document;

// Centers
// -id
// -name

@Schema()
export class Center {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;
}

export const CenterSchema = SchemaFactory.createForClass(Center);
