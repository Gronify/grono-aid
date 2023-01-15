import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Center } from 'src/center/schemas/center.schema';
import { Gift } from 'src/gifts/schemas/gift.schema';
import { Human } from 'src/human/schemas/human.schema';
import { User } from 'src/user/schemas/user.schema';

export type DistributionDocument = Distribution & Document;

// Distribution
// -id
// -humanid
// -giftid
// -timestamps
// -comment

@Schema({ timestamps: true })
export class Distribution {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Human',
    required: true,
  })
  humanId: Human;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift',
    required: true,
  })
  giftId: Gift;

  @Prop()
  amount: number;

  @Prop()
  comment: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;
}

export const DistributionSchema = SchemaFactory.createForClass(Distribution);
