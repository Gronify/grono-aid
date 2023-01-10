import { ApiProperty } from '@nestjs/swagger';

export class CreateCenterDto {
  @ApiProperty({ example: 'TatoHub', description: 'Name if center' })
  readonly name: string;
}
