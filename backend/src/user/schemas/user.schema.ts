import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { Role } from 'src/roles/schemas/roles.schema';

export type UserDocument = User & Document;

// Users
// -id
// -email
// -password
// -fullname
// -role
// -centerid //todo

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullname: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
