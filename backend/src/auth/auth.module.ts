import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

// const jwtConfig = {
//   JWT_ACCESS_SECRET=accessSecret,
//   JWT_ACCESS_EXPIRATION_TIME=3600,
//   JWT_REFRESH_SECRET=refreshSecret,
//   JWT_REFRESH_EXPIRATION_TIME=86400,
// }

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>(
            'JWT_ACCESS_EXPIRATION_TIME',
          )}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
