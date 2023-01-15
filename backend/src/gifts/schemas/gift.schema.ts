import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Center } from 'src/center/schemas/center.schema';

export type GiftDocument = Gift & Document;

// Gifts
// -id
// -name
// -description
// -measurement
// -centerid

@Schema()
export class Gift {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  period: number;

  @Prop({ required: true })
  measurement: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true,
  })
  centerId: Center;
}

export const GiftSchema = SchemaFactory.createForClass(Gift);
