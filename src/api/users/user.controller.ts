import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

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
