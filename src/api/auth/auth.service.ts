import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilitiesService } from 'src/helpers/utils';
import { LoginDto } from '../users/dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly _jwtService: JwtService,
    private helper: UtilitiesService
  ) {}

  async login(userCredentials: LoginDto) {
    const user: any = await this.userService.getUserByEmailOrUsername(userCredentials);

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const isPasswordValid = this.helper.isPasswordValid(userCredentials.password, user.password);

    if (!isPasswordValid) throw new HttpException('invalid email/password', HttpStatus.CONFLICT);

    const token: string = await this._jwtService.signAsync(
      { id: user.id, email: user.email },
      { secret: process.env.JWT_SECRET_KEY }
    );

    const responseWithToken = { ...user.dataValues, token };
    const userWithoutPassword = this.helper.excludeOnlyPwd(responseWithToken);
    return userWithoutPassword;
  }
}
