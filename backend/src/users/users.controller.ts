import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { AddAttendanceDTO } from './dto/add-attendance.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('attendance')
  async addAttendance(@Body() data: AddAttendanceDTO, @User() user) {
    return await this.userService.addAttendance(data, user.studentStatusId);
  }
}
