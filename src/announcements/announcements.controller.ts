import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller('announcements')
export class AnnouncementsController {
  // TODO:
  // 1. bisa bikin announcement
  // 2. bisa baca announcement
  // 3. bisa update announcement
  // 4. bisa delete announcement

  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  async create(@Body() body: CreateAnnouncementDto) {
    return this.announcementsService.create(body);
  }

  @Get()
  async getAll() {
    return this.announcementsService.getAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    return this.announcementsService.getOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateAnnouncementDto) {
    return this.announcementsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return {
      msg: 'This data has been deleted',
      data: await this.announcementsService.delete(id),
    };
  }
}
