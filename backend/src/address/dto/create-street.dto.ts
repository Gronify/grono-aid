import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';
import mongoose from 'mongoose';

export class CreateStreetDto {
  @ApiProperty({ example: 'Parkova', description: 'Name of Street' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'street of city',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly cityId: mongoose.Schema.Types.ObjectId;
}
