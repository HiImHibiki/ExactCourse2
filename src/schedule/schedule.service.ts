import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDTO } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  async addSchedule(data: CreateScheduleDTO) {
    const checkSchedule = await this.prismaService.course.findMany({
      where: {
        dateStart: new Date(data.dateStart),
      },
    });

    if (checkSchedule) {
      checkSchedule.find((el) => {
        if (el.room == data.room) {
          throw new ConflictException('Room is used on that session');
        }
        if (el.mentorId == data.mentorId) {
          throw new ConflictException('Mentor have class on that session');
        }
      });
    }

    const newSchedule = await this.prismaService.course.create({
      data: {
        dateStart: new Date(data.dateStart),
        dateEnd: new Date(data.dateEnd),
        courseType: data.courseType,
        currentCapacity: 0,
        classCapacity: data.classCapacity,
        room: data.room,
        linkClass: data.linkClass,
        mentor: {
          connect: { id: data.mentorId },
        },
      },
    });

    if (!newSchedule) {
      throw new BadRequestException('Fail to add schedule');
    }

    return newSchedule;
  }

  async getSchedules() {
    const schedules = await this.prismaService.course.findMany({
      orderBy: {
        dateStart: 'asc',
      },
    });
    return schedules;
  }

  async addStudentToSchedule(courseId: string, student: Student) {
    const course = await this.prismaService.course.findUnique({
      where: { id: courseId },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (course.currentCapacity == course.classCapacity) {
      throw new BadRequestException('Class is full');
    }

    const studentStatus = await this.prismaService.studentStatus.findUnique({
      where: {
        id: student.studentStatusId,
      },
    });
    if (studentStatus.attendance == 0) {
      throw new BadRequestException(
        'Your attendance is 0. Please add more attendance',
      );
    }

    const courseStudent = await this.prismaService.courseStudent.findFirst({
      where: {
        studentId: student.id,
        courseId: courseId,
      },
    });
    if (courseStudent) {
      throw new BadRequestException('You have already booked this class');
    }

    const newCourseStudent = await this.prismaService.courseStudent.create({
      data: {
        student: {
          connect: { id: student.id },
        },
        course: {
          connect: { id: courseId },
        },
      },
    });

    const updateCapacity = await this.prismaService.course.update({
      where: {
        id: courseId,
      },
      data: {
        currentCapacity: {
          increment: 1,
        },
      },
    });

    const level = Math.floor((studentStatus.expPoint + 5) / 100) + 1;

    const updateStatus = await this.prismaService.studentStatus.update({
      where: {
        id: student.studentStatusId,
      },
      data: {
        expPoint: {
          increment: 5,
        },
        level: level,
      },
    });

    return {
      updateCapacity,
      newCourseStudent,
      updateStatus,
    };
  }

  async getMySchedules(data: Student) {
    const courseList = await this.prismaService.courseStudent.findMany({
      where: {
        studentId: data.id,
      },
      include: {
        course: true,
      },
    });
    if (!courseList) {
      throw new NotFoundException('You have no courses');
    }

    return courseList;
  }
}
