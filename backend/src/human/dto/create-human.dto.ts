import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';

import mongoose, { ObjectId } from 'mongoose';

export class CreateHumanDto {
  @ApiProperty({ example: 'Alex', description: 'Name of human' })
  readonly name: string;

  @ApiProperty({ example: 'Ivanov', description: 'Surname of human' })
  readonly surname: string;

  @ApiProperty({
    example: 'Alexandrovich',
    description: 'patronymic of human',
  })
  readonly patronymic: string;

  @ApiProperty({
    example: '+380991234567',
    description: 'phone of human',
  })
  readonly phone: string;

  @ApiProperty({
    example: '1234567890',
    description: 'phone of human',
  })
  readonly ipn: string;

  @ApiProperty({
    example: '&&&???',
    description: 'dateOfBirthday of human',
  })
  readonly dateOfBirthday: Date;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'address of human',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly address: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'actualAddress of human',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly actualAddress: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: 'НВ12345',
    description: 'passportid of human',
  })
  readonly passportId: string;

  @ApiProperty({
    example: '🤡🤡🤡🤡',
    description: 'comment about human',
  })
  readonly comment: string;

  @ApiProperty({
    example: true,
    description: 'blocked or not',
  })
  readonly blocked: boolean;
}
