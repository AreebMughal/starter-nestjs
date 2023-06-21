import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { UtilitiesService } from "src/helpers/utils";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { HttpModule, HttpService } from "@nestjs/axios/dist";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, //enter secret key from the config file
      signOptions: { expiresIn: "8h" },
    }),
  ],
  exports: [AuthService],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    // RefreshTokenStrategy,
    UtilitiesService,
  ],

  controllers: [AuthController],
})
export class AuthModule {}
