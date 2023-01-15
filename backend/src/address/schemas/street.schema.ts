import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';
import { City } from './city.schema';

export type StreetDocument = Street & Document;

// Street
// -id
// -streetid

@Schema()
export class Street {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  })
  cityId: City;
}

export const StreetSchema = SchemaFactory.createForClass(Street);
