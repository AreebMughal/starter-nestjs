import { LoginDto } from '../users/dto/login.dto';
import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginWithGoogleDto } from './dto/login-with-google.dto';

@ApiTags('login') //used to make the blocks of specific apis in swagge
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
