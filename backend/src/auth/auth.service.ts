import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async register(data: RegisterDto, role: Role) {
    // 1. Hash user password [X]
    // 2. Insert to database with hashed password [X]
    // 3. Generate JWT token [X]
    // 4. Return JWT token [X]
    const hashedPassword = await hash(data.password, 10);

    // handle kalo misal ada error
    try {
      const user = await this.usersService.createUser(
        {
          ...data,
          password: hashedPassword,
        },
        role,
      );

      return this.generateTokens({ userId: user.id });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // TODO: return conflicted field name
        throw new ConflictException('User already exists'); // status code 409
      }

      throw new InternalServerErrorException();
    }
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findOne({
      email: data.email,
    });

    if (!user) {
      throw new NotFoundException(
        `User with email: ${data.email} does not exist.`,
      );
    }

    const isValidPassword = await compare(data.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({ userId: user.id });
  }

  async refresh(data: RefreshTokenDto) {
    try {
      // INI NTAR SAYA JELASKAN
      const payload = this.jwtService.verify(data.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findOne({
        id: payload.userId,
      });

      return this.generateTokens({ userId: user.id });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  generateTokens(payload: { userId: string }) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
    });
  }

  async validateUser(userId: string) {
    return await this.usersService.findOne({
      id: userId,
    });
  }
}
