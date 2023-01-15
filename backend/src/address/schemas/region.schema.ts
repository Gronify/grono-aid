import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';

export type RegionDocument = Region & Document;

// Region
// -id

@Schema()
export class Region {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
