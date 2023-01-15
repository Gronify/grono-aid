import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class LoginUserDto {
  @ApiProperty({ example: 'useremail@gmail.com', description: 'email of user' })
  readonly email: string;
  @ApiProperty({ example: 'sadsdadasdsa', description: 'password of user' })
  readonly password: string;
}
