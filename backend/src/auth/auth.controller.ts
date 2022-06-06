import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from '@prisma/client';

@Public()
@Controller('auth')
export class AuthController {
  // localhost:3000/auth/register [X]
  // localhost:3000/auth/login [X]
  // localhost:3000/auth/refresh [X]
  constructor(private readonly authService: AuthService) {}

  @Post('register/student')
  async registerStudent(@Body() data: RegisterDto) {
    return await this.authService.register(data, Role.Student);
  }

  @Post('register/mentor')
  async registerMentor(@Body() data: RegisterDto) {
    return await this.authService.register(data, Role.Mentor);
  }

  @Post('login')
  async loginMentor(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Post('refresh')
  async refresh(@Body() data: RefreshTokenDto) {
    return await this.authService.refresh(data);
  }
}
