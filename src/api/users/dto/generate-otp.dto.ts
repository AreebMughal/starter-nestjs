import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class GenerateOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
