import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { TypeOrmConfigService } from './core/providers/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule {}
