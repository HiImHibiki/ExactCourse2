import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddAttendanceDTO } from './dto/add-attendance.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserDTO, role: Role) {
    try {
      // create new user
      const newUser = await this.prismaService.user.create({
        data: {
          role: role,
          name: data.name,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: data.password,
          birthday: data.birthday,
          gender: data.gender,
        },
      });

      if (role === 'Student') {
        // create new student
        await this.prismaService.student.create({
          data: {
            user: {
              connect: { id: newUser.id },
            },
          },
        });
      } else {
        // create new mentor
        await this.prismaService.mentor.create({
          data: {
            user: {
              connect: { id: newUser.id },
            },
          },
        });
      }

      return newUser;
    } catch (error) {
      throw new BadRequestException('Fail to create user');
    }
  }

  async findOne(whereUniqueQuery: Prisma.UserWhereUniqueInput) {
    return await this.prismaService.user.findUnique({
      where: whereUniqueQuery,
    });
  }

  // FIXME: should be in a separate service and controller
  async addAttendance(data: AddAttendanceDTO, id: string) {
    try {
      const userStatus = await this.prismaService.student.update({
        data: {
          attendance: {
            increment: data.attendanceQty,
          },
        },
        where: {
          id: id,
        },
      });
      return userStatus;
    } catch (error) {
      throw new BadRequestException('Fail to add attendance');
    }
  }
}
