import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';

import mongoose, { ObjectId } from 'mongoose';

export class CreateDistributionDto {
  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'HumanId',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly humanId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'giftId',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly giftId: mongoose.Schema.Types.ObjectId;

  @IsDefined()
  @IsNotEmpty()
  readonly amount: number;

  readonly comment: string;

  userId: mongoose.Schema.Types.ObjectId;
}
