import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCityDto {
  @ApiProperty({ example: 'Kramatorsk', description: 'Name of City' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'region of city',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly regionId: mongoose.Schema.Types.ObjectId;
}
