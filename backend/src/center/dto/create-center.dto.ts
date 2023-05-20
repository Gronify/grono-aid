import { ApiProperty } from '@nestjs/swagger';

export class CreateCenterDto {
  @ApiProperty({ example: 'CenterHub', description: 'Name of center' })
  readonly name: string;

  @ApiProperty({ example: 'CenterHub', description: 'address of center' })
  readonly address: string;

  @ApiProperty({ example: '+380991234567', description: 'phone of center' })
  readonly phone: string;

  @ApiProperty({
    example: '+380991234567',
    description: 'phone of center director',
  })
  readonly phoneDirector: string;

  @ApiProperty({
    example: 'Alex Alex Alex',
    description: 'fullName of center director',
  })
  readonly director: string;
}
