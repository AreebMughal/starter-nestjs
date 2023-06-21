import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty()
  @IsNumber()
  otp: number;
}
