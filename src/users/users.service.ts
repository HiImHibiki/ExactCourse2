import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddAttendanceDTO } from './dto/add-attendance.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async addAttendance(data: AddAttendanceDTO, id: string) {
    try {
      const userStatus = await this.prismaService.studentStatus.update({
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
      throw new BadRequestException();
    }
  }
}
