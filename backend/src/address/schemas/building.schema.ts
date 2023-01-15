import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Street } from './Street.schema';

export type BuildingDocument = Building & Document;

// Building
// -id
// -buildingid

@Schema()
export class Building {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Street',
    required: true,
  })
  streetId: Street;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
