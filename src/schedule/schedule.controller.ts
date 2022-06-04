import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Student } from 'src/common/decorators/student.decorator';
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
  async addStudentToSchedule(@Param('id') id: string, @Student() student) {
    // console.log(typeof student.id);
    return await this.scheduleService.addStudentToSchedule(id, student);
  }

  @Get('myclass')
  async getMySchedules(@Student() student) {
    return await this.scheduleService.getMySchedules(student);
  }
}
