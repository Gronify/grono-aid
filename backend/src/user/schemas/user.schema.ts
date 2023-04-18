import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { Center } from 'src/center/schemas/center.schema';
import { Role } from 'src/roles/schemas/roles.schema';

export type UserDocument = User & Document;

// Users
// -id
// -email
// -password
// -fullname
// -role
// -centerid

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  surname: string;

  @Prop()
  name: string;

  @Prop()
  patronymic: string;

  @Prop()
  phone: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true,
  })
  centerId: Center;
}

export const UserSchema = SchemaFactory.createForClass(User);
