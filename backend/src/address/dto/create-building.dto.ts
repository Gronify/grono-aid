import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';
import mongoose from 'mongoose';

export class CreateBuildingDto {
  @ApiProperty({ example: '5', description: 'Number/Name of Building' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'Building of street',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly streetId: mongoose.Schema.Types.ObjectId;
}
