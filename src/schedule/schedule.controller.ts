import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { CreateScheduleDTO } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async addSchedule(@Body() data: CreateScheduleDTO) {
    return await this.scheduleService.addSchedule(data);
  }

  @Get()
  async getSchedules() {
    return await this.scheduleService.getSchedules();
  }

  @Post(':id')
  async addStudentToSchedule(@Param('id') id: string, @User() user) {
    // console.log(typeof student.id);
    return await this.scheduleService.addStudentToSchedule(id, user);
  }

  @Get('myclass')
  async getMySchedules(@User() user) {
    return await this.scheduleService.getMySchedules(user);
  }
}
