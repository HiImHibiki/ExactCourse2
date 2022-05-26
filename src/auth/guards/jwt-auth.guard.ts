import { Reflector } from '@nestjs/core';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

// Goal
// Guard ini harus ngecheck dulu apakah route ada punya
// decorator @Public()
// Kalo ada, maka akan diperbolehkan request lewat / guard ini gak ada gunanya
// Kalo gak ada, maka akan dicek dulu si user melalui jwt
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // cek method
      context.getClass(), // cek class
    ]);

    // kalo ada decoratornya, yaudah true
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
