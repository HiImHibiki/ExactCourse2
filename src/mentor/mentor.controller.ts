import { Controller, Get } from '@nestjs/common';
import { MentorService } from './mentor.service';

@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Get()
  async getAllMentor() {
    return await this.mentorService.GetAllMentor();
  }
}
