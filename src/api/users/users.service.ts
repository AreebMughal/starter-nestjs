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

@Injectable()
export class UsersService {
  constructor(
    private readonly helper: UtilitiesService,
    private readonly _jwtService: JwtService,
    @InjectRepository(User) private readonly repository: BaseRepository<User>
  ) {}

  // controller functions

  async createUser(payload: CreateUserDto): Promise<any> {
    const { email } = payload;

    const user_email = await this.repository.find({ where: { email } });
    // const user_name = await this.repository.find({ where: { userName } });
    console.log(user_email);
    if (user_email.length > 0)
      throw new HttpException(EMAIL_ALREADY_EXIST_RESPONSE.message, HttpStatus.CONFLICT);

    // if (user_name) throw new HttpException('Username already exist', HttpStatus.CONFLICT);

    try {
      // const encodedPassword: string = this.helper.encodePassword(password);
      const newUser: any = await this.repository.create({
        ...payload,
        createdBy: 0,
        updatedBy: 0
      });
      await this.repository.save(newUser);
      console.log(newUser);
      return newUser;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // utilities functions

  async findUserByArgs(args: object) {
    const user = await this.repository.find({
      ...args
    });
    if (!user) throw new HttpException(NOT_FOUND_RESPONSE.message, HttpStatus.NOT_FOUND);
    return user;
  }

  async getUserByEmailOrUsername(body: EmailDto) {
    const { email } = body;
    let user = await this.repository.find({ where: { email } });
    // if (!user) user = await this.repository.find({ where: { userName: email } });
    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }
}
