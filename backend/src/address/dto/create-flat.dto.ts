import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';
import mongoose from 'mongoose';

export class CreateFlatDto {
  @ApiProperty({ example: '5', description: 'Number/Name of Flat' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'Flat of Building',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly buildingId: mongoose.Schema.Types.ObjectId;
}
