import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

interface JwtDto {
  userId: string;
  [key: string]: string | number;
}

// FLOW:
// Guard akan manggil JwtStrategy
// JwtStrategy akan mengambil token dari request
// JwtStrategy akan memvalidasi token
// JwtStrategy akan mengambil payload dari token
// JwtStrategy akan mengambil userId dari payload
// JwtStrategy akan memvalidasi userId dengan userId yang ada di database
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtDto) {
    const user = await this.authService.validateUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // apapun yang gw balikin disini, akan disimpan otomatis di req.user
  }
}
