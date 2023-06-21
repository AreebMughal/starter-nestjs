import { LoginDto } from './login.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateLoginDto extends PartialType(LoginDto) {}
