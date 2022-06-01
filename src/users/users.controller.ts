import { Controller, Get } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';

@Controller('users')
export class UsersController {
  @Get('me')
  async getMe(@User() user) {
    return user;
  }
}
