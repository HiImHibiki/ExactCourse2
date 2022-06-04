import { Body, Controller, Get, Post } from '@nestjs/common';
import { Student } from '../common/decorators/student.decorator';
import { AddAttendanceDTO } from './dto/add-attendance.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  async getMe(@Student() user) {
    return user;
  }

  @Post('attendance')
  async addAttendance(@Body() data: AddAttendanceDTO, @Student() user) {
    return await this.userService.addAttendance(data, user.studentStatusId);
  }
}
