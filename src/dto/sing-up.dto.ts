import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SingUpDto {
  @ApiProperty()
  @IsString()
  password: string;
}
