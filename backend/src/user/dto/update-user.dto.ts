import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateUserDto {
  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'id of user',
  })
  readonly _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ example: 'useremail@gmail.com', description: 'email of user' })
  readonly email: string;
  @ApiProperty({ example: 'sadsdadasdsa', description: 'password of user' })
  readonly password: string;

  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: 'center of gift',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly centerId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Alex ', description: 'name of user' })
  readonly surname: string;
  @ApiProperty({ example: 'Alex ', description: 'name of user' })
  readonly name: string;
  @ApiProperty({ example: 'Alex ', description: 'name of user' })
  readonly patronymic: string;

  @ApiProperty({ example: '+3845845544 ', description: 'phone of user' })
  readonly phone: string;
}
