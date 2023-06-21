import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import { UtilitiesService } from 'src/helpers/utils';
import { User } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, JwtService, UtilitiesService]
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
