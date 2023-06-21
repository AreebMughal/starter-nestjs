import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'user email',
    example: 'abc@user.com'
  })
  @IsNotEmpty({ message: 'email can not be empty' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'accessToken',
    example: '*****'
  })
  @IsNotEmpty({ message: 'access token cannot be empty' })
  @IsString()
  accessToken: string;
}
