import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async createUser(@Body() userDto: CreateUserDto) {
    const user = await this.usersService.createUser(userDto);
    return user;
  }
}
