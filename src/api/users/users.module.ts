import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import { UtilitiesService } from 'src/helpers/utils';
import { User } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { OtpService } from '../otp/otp.service';
import { Otp } from 'src/entities/otp.entity';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Profile, Otp])],
  controllers: [UsersController],
  providers: [UsersService, JwtService, UtilitiesService, OtpService]
})
export class UsersModule {}

// MiddlewareConsumer settings
// export class UserModule implements NestModule {
//   public configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({path: 'user', method: RequestMethod.GET}, {path: 'user', method: RequestMethod.PUT});
//   }
// }
