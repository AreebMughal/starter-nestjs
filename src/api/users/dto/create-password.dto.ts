import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePasswordDto {
  @ApiProperty({
    description: 'password',
    example: '*****'
  })
  @IsNotEmpty({ message: 'password can not be empty' })
  @IsString()
  password: string;
}
