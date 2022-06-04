import { Controller, Get, Post } from '@nestjs/common';
import { Student } from '../common/decorators/student.decorator';

@Controller('users')
export class UsersController {
  @Get('me')
  async getMe(@Student() user) {
    return user;
  }
}
