import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Region } from './region.schema';

export type CityDocument = City & Document;

// City
// -id
// -regionid

@Schema()
export class City {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: true,
  })
  regionId: Region;
}

export const CitySchema = SchemaFactory.createForClass(City);
