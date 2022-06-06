import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreateForumDTO } from './dto/create-forum.dto';

@Injectable()
export class ForumService {
  constructor(private readonly prismaService: PrismaService) {}

  async postForum(data: CreateForumDTO, student: Student) {
    try {
      const newForum = await this.prismaService.forum.create({
        data: {
          title: data.title,
          tag: data.tag,
          message: data.message,
          student: {
            connect: { id: student.id },
          },
        },
      });

      return newForum;
    } catch (error) {
      throw new BadRequestException('Fail to create new forum');
    }
  }

  async getAllForum() {
    const forums = await this.prismaService.forum.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (forums.length == 0) {
      throw new NotFoundException('There is no forum in the database');
    }

    return forums;
  }

  async getForumById(id: string) {
    try {
      const forum = await this.prismaService.forum.findUnique({
        where: {
          id: id,
        },
        include: {
          comment: true,
        },
      });
      return forum;
    } catch (error) {
      throw new NotFoundException('Forum not found');
    }
  }

  async postComment(data: CreateCommentDTO, forumId: string, student: Student) {
    try {
      const forum = await this.prismaService.forum.findUnique({
        where: {
          id: forumId,
        },
      });
      if (!forum) {
        throw new NotFoundException('Forum not found');
      }

      const comment = await this.prismaService.comment.create({
        data: {
          message: data.message,
          like: 0,
          dislike: 0,
          forum: {
            connect: { id: forumId },
          },
          student: {
            connect: { id: student.id },
          },
        },
      });
      return comment;
    } catch (error) {
      throw new BadRequestException('Fail to post comment');
    }
  }
}
