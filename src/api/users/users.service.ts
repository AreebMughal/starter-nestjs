import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { NOT_FOUND_RESPONSE } from 'src/constants';
import { EMAIL_ALREADY_EXIST_RESPONSE } from 'src/constants/response.types';
import { BaseRepository } from 'src/core/base/base.service';
import { User } from 'src/entities';
import { EmailDto } from 'src/generic-dto/email.dto';
import { UtilitiesService } from 'src/helpers/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from 'src/entities/profile.entity';
import { CreatePasswordDto } from './dto/create-password.dto';
import { CreateOtpDto } from '../otp/dto/create-otp.dto';
import { OtpService } from '../otp/otp.service';
import { VerifyOtpDto } from '../otp/dto/verify-otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PersonalDetailDto } from '../profile/dto/personal-detail.dto';
import { IdDto } from 'src/generic-dto/id.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly helper: UtilitiesService,
    private readonly _jwtService: JwtService,
    private readonly otpService: OtpService,
    @InjectRepository(User) private readonly userRepository: BaseRepository<User>,
    @InjectRepository(Profile) private readonly profileRepository: BaseRepository<Profile>
  ) {}

  // controller functions

  async createUser(payload: CreateUserDto): Promise<any> {
    const { email } = payload;

    const user_email = await this.userRepository.find({ where: { email } });
    console.log(user_email);
    if (user_email.length > 0) {
      throw new HttpException(EMAIL_ALREADY_EXIST_RESPONSE.message, HttpStatus.CONFLICT);
    }

    try {
      // const encodedPassword: string = this.helper.encodePassword(password);
      const newUser: any = await this.userRepository.create({
        ...payload
      });
      await this.userRepository.save(newUser);
      console.log(newUser);
      const newProfile: any = await this.profileRepository.create({
        ...payload,
        userId: newUser.id
      });
      await this.profileRepository.save(newProfile);

      return { ...newUser, ...newProfile };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateOtp(generataOtpDto: CreateOtpDto): Promise<any> {
    const { email } = generataOtpDto;
    const user_email = await this.userRepository.find({ where: { email } });
    if (user_email.length > 0) {
      return await this.otpService.generateOtp(generataOtpDto);
    } else {
      throw new HttpException(NOT_FOUND_RESPONSE.message, HttpStatus.NOT_FOUND);
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any> {
    const { email } = verifyOtpDto;
    const verifyOtpResponse = await this.otpService.verifyOtp(verifyOtpDto);
    console.log(verifyOtpResponse);
    if (verifyOtpResponse) {
      const data = await this.findAndUpdateUserByArgs({ email }, { isEmailVerified: true });
      return {
        message: 'Email verified successfully',
        data
      };
    } else {
      throw new HttpException('Otp not matched', HttpStatus.OK);
    }
  }

  async createPassword(body: CreatePasswordDto): Promise<any> {
    const { email, password } = body;
    const user: User = await this.getVerifiedUserByEmailOrId({ email });
    const encodedPassword: string = this.helper.encodePassword(password);
    const data = await this.findAndUpdateUserByArgs({ email }, { password: encodedPassword });
    return {
      message: 'Password created successfully',
      data: { ...data, password: undefined }
    };
  }

  async forgotPassword(body: EmailDto): Promise<any> {
    const { email } = body;
    const user: User = await this.getUserByEmail({ email });
    if (user.isEmailVerified) {
      return await this.otpService.generateOtp({ email });
    } else {
      throw new HttpException('Email not verified', HttpStatus.OK);
    }
  }

  async changePassword(body: ChangePasswordDto): Promise<any> {
    const { email, oldPassword, newPassword } = body;
    const user: User = await this.getVerifiedUserByEmailOrId({ email });
    const isPasswordValid = this.helper.isPasswordValid(oldPassword, user.password);
    if (!isPasswordValid)
      throw new HttpException('Old password does not match', HttpStatus.BAD_REQUEST);

    const encodedPassword: string = this.helper.encodePassword(newPassword);
    const data = await this.findAndUpdateUserByArgs({ email }, { password: encodedPassword });
    return {
      message: 'Password changed successfully'
    };
  }

  async addPersonalDetails(body: PersonalDetailDto): Promise<any> {
    const { userId } = body;
    const user: User = await this.getVerifiedUserByEmailOrId({ id: userId });
    console.log(user, user.profile);
  }

  // utilities functions

  async findAndUpdateUserByArgs(findArgs: object, updateArgs: object): Promise<any> {
    const response = await this.userRepository.update({ ...findArgs }, { ...updateArgs });
    if (response) {
      return await this.findUserByArgs({ ...findArgs });
    } else {
      throw new HttpException('User could not updated', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserByArgs(args: object): Promise<any> {
    const user = await this.userRepository.find({
      where: { ...args }
    });
    if (!user) throw new HttpException(NOT_FOUND_RESPONSE.message, HttpStatus.NOT_FOUND);
    return user;
  }

  async getUserByEmail(body: EmailDto): Promise<any> {
    const { email } = body;
    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    return { ...user };
  }

  async getVerifiedUserByEmailOrId(condition: EmailDto | IdDto): Promise<any> {
    let user = await this.userRepository.findOne({ where: { ...condition } });
    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    if (!user.isEmailVerified) throw new HttpException('Email not verified', HttpStatus.NOT_FOUND);
    return user;
  }
}
