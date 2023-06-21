import { Body, Controller, Post, Req, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EMAIL_SEND_TYPE, ROLE_TYPE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { EmailDto } from 'src/generic-dto/email.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PermissionAccessGuard } from 'src/guards/permission-access-guard.guard';
import { ChangePasswordFromLinkDto } from './dto/change-password-from-link.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { UserDto } from './dto/user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UsersService } from './users.service';
import { LoginVerifiedGuard } from 'src/guards/login-verified.guard';
import { EmailVerifiedGuard } from 'src/guards/email-verified.guard';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async createUser(@Body() userDto: UserDto) {
    const user = await this.usersService.createUser(userDto);
    return user;
  }
}
