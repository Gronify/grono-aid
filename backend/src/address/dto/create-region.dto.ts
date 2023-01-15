import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ example: 'Donetck', description: 'Name of Region' })
  @IsNotEmpty()
  readonly name: string;
}
