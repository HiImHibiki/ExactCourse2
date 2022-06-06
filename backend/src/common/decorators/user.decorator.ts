import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User as PrismaUser } from '@prisma/client';

export const User = createParamDecorator(
  <T extends PrismaUser>(data: keyof T, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as T;
    return data ? user[data] : user;
  },
);
