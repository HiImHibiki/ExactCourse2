import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnnouncementsService {
  // ini dependency injection prismanya
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    // return 'This action adds a new announcement with data from createAnnouncementDto';
    // return {
    //   message:
    //     'This action adds a new announcement with data from createAnnouncementDto',
    //   data: createAnnouncementDto,
    // };

    // 1
    // return await this.prismaService.announcement.create({
    //   data: createAnnouncementDto
    // })

    // 2
    // this.prismaService.<table_name>.<method_name>
    const newAnnouncement = await this.prismaService.announcement.create({
      data: createAnnouncementDto,
    });
    return newAnnouncement;

    // 3
    // const { title, detail } = createAnnouncementDto;
    // const newAnnouncement = await this.prismaService.announcement.create({
    //   data: {
    //     title: title,
    //     detail: detail,
    //   }
    // })
    // return newAnnouncement;
  }

  async getAll() {
    const announcements = await this.prismaService.announcement.findMany();

    return announcements;
  }

  async getOneById(id: string) {
    // Find Unique / Find First
    const announcement = await this.prismaService.announcement.findUnique({
      where: { id: id },
    });

    return announcement;
  }

  async getOneByTitle(title: string) {
    const announcement = await this.prismaService.announcement.findFirst({
      where: { title: title },
      orderBy: { createdAt: 'desc' },
    }); // ngambil ann yang paling baru dibuat dalam tanggal pembuatan

    return announcement;
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    const updatedAnnouncement = await this.prismaService.announcement.update({
      where: { id: id },
      data: updateAnnouncementDto,
    });

    return updatedAnnouncement;
  }

  async delete(id: string) {
    const announcement = await this.prismaService.announcement.delete({
      where: { id: id },
    });

    return announcement;
  }
}
