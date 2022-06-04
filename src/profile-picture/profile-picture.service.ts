import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfilePictureDto } from './dto/create-profile-picture.dto';

@Injectable()
export class ProfilePictureService {
  constructor(private readonly prismaService: PrismaService) {}

  // Handle saving to database
  async saveFile(userId: string, file: CreateProfilePictureDto) {
    const profilePicture =
      await this.prismaService.studentProfilePicture.create({
        data: {
          name: file.name,
          path: file.path,
          mimetype: file.mimetype,
          student: {
            connect: { id: userId },
          },
        },
      });
    return profilePicture;
  }

  // Handle getting from database
  async getFile(id: string) {
    const file = await this.prismaService.studentProfilePicture.findUnique({
      where: { id },
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }
}
