import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMentorDTO } from './dto/create-mentor.dto';

@Injectable()
export class MentorService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateMentor(data: CreateMentorDTO) {
    try {
      const newMentor = await this.prismaService.mentor.create({
        data: {
          name: data.name,
          teachingMethod: data.teachingMethod,
          rating: data.rating,
        },
      });

      return newMentor;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async GetAllMentor() {
    const mentors = await this.prismaService.mentor.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return mentors;
  }
}
