import { ApiProperty } from '@nestjs/swagger';

export class EditCenterDto {
  @ApiProperty({
    example: '63bcf652a3989d2896074cf0',
    description: '_id of center',
  })
  readonly _id: string;

  @ApiProperty({ example: 'TatoHub', description: 'Name of center' })
  readonly name: string;

  @ApiProperty({ example: 'TatoHub', description: 'address of center' })
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
