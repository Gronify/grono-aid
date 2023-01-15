import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';

export type HumanDocument = Human & Document;

// Human
// -id
// -surname
// -name
// -patronymic
// -phone
// -inn
// -dateOfBirthday
// -address
// -trueaddress
// -timestamp
// -passportid (for no inn human)
// -comment

@Schema({ timestamps: true })
export class Human {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  patronymic: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  ipn: string;

  @Prop()
  dateOfBirthday: Date;

  @Prop({
    types: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flat',
      required: true,
    },
  })
  address: mongoose.Schema.Types.ObjectId;

  @Prop({
    types: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flat',
      required: true,
    },
  })
  actualAddress: mongoose.Schema.Types.ObjectId;

  @Prop({ default: '' })
  passportId: string;

  @Prop({ default: '' })
  comment: string;

  @Prop({ default: false })
  blocked: boolean;
}

export const HumanSchema = SchemaFactory.createForClass(Human);
