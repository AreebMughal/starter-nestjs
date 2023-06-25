import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { BaseRepository } from 'src/core/base/base.service';
import { UtilitiesService } from 'src/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from 'src/entities/otp.entity';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { NOT_FOUND_RESPONSE } from 'src/constants';

@Injectable()
export class OtpService {
  constructor(
    private readonly helper: UtilitiesService,
    @InjectRepository(Otp) private readonly otpRepository: BaseRepository<Otp>
  ) {}

  async generateOtp(generataOtpDto: CreateOtpDto): Promise<any> {
    const { email } = generataOtpDto;
    const otp: number = this.helper.generateOtp();
    // add otp send here
    // await this.utilities.sendOtp(phone, otp);
    const data = await this.otpRepository.upsert(
      [
        {
          email,
          expiryTime: this.helper.generateFutureDate(30),
          otp
        }
      ],
      ['email']
    );

    return { message: `Otp Sent Successfully ${otp}` };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<boolean> {
    const { email, otp } = verifyOtpDto;
    const otpField = await this.otpRepository.findOne({ where: { email } });
    if (!otpField) {
      throw new HttpException(NOT_FOUND_RESPONSE.message, HttpStatus.NOT_FOUND);
    }
    if (!this.isOtpExpired(otpField.expiryTime)) {
      return otpField.otp === otp;
    } else {
      throw new HttpException('Otp has been expired', HttpStatus.OK);
    }
  }

  isOtpExpired(expirationTime: Date): boolean {
    return expirationTime.getTime() < new Date().getTime();
  }
}
