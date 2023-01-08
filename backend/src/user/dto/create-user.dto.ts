import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'useremail@gmail.com', description: 'email of user' })
  readonly email: string;
  @ApiProperty({ example: 'sadsdadasdsa', description: 'password of user' })
  readonly password: string;
}
