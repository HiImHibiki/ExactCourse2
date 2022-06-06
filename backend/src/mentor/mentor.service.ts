import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MentorService {
  constructor(private readonly prismaService: PrismaService) {}

  async GetAllMentor() {
    const mentors = await this.prismaService.mentor.findMany({
      include: {
        user: true,
      },
      orderBy: {
        user: {
          name: 'asc',
        },
      },
    });
    return mentors;
  }
}
