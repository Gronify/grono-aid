import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Building } from './building.schema';

export type FlatDocument = Flat & Document;

// Flat
// -id
// -buildingid

@Schema()
export class Flat {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
    required: true,
  })
  buildingId: Building;
}

export const FlatSchema = SchemaFactory.createForClass(Flat);
