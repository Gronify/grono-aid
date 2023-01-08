import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  value: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
