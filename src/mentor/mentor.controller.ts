import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMentorDTO } from './dto/create-mentor.dto';
import { MentorService } from './mentor.service';

@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Post()
  async createMentor(@Body() data: CreateMentorDTO) {
    return await this.mentorService.CreateMentor(data);
  }

  @Get()
  async getAllMentor() {
    return await this.mentorService.GetAllMentor();
  }
}
