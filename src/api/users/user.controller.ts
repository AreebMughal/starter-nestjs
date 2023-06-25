import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateOtpDto } from '../otp/dto/create-otp.dto';
import { OtpService } from '../otp/otp.service';
import { VerifyOtpDto } from '../otp/dto/verify-otp.dto';
import { CreatePasswordDto } from './dto/create-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PersonalDetailDto } from '../profile/dto/personal-detail.dto';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService, private otpService: OtpService) {}

  @Post('/register')
  async createUser(@Body() userDto: CreateUserDto) {
    const user = await this.usersService.createUser(userDto);
    return user;
  }

  @Post('/generate-otp')
  async generateOtp(@Body() body: CreateOtpDto) {
    const otp = await this.usersService.generateOtp(body);
    return otp;
  }

  @Post('/verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    const otp = await this.usersService.verifyOtp(body);
    return otp;
  }

  @Post('/create-password')
  async createPassword(@Body() body: CreatePasswordDto) {
    const otp = await this.usersService.createPassword(body);
    return otp;
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: CreateOtpDto) {
    const otp = await this.usersService.forgotPassword(body);
    return otp;
  }

  @Post('/change-password')
  async changePassword(@Body() body: ChangePasswordDto) {
    const otp = await this.usersService.changePassword(body);
    return otp;
  }

  @Post('/add-personal-details')
  async addPersonalInfo(@Body() body: PersonalDetailDto) {
    const otp = await this.usersService.addPersonalDetails(body);
    return otp;
  }
}
