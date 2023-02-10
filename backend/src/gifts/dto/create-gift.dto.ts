import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';

import mongoose, { ObjectId } from 'mongoose';
import { Center } from 'src/center/schemas/center.schema';

export class CreateGiftDto {
  @ApiProperty({ example: 'Product unit', description: 'Name of gift' })
  readonly name: string;

  @ApiProperty({ example: 'Products', description: 'description of gift' })
  readonly description: string;

  @ApiProperty({
    example: 'Units / kg / liters',
    description: 'measurement of gift',
  })
  readonly measurement: string;

  @ApiProperty({
    example: 'Units / kg / liters',
    description: 'period of gift',
  })
  readonly period: number;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'center of gift',
  })
  readonly centerId: mongoose.Schema.Types.ObjectId;
}
