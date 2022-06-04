import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Student as PrismaStudent } from '@prisma/client';

export const Student = createParamDecorator(
  <T extends PrismaStudent>(data: keyof T, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const student = request.user as T;
    return data ? student[data] : student;
  },
);
