import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/isPublic';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      if (info) {
        switch (info.name) {
          case 'TokenExpiredError':
            throw new UnauthorizedException('Token has expired');
          case 'JsonWebTokenError':
            throw new UnauthorizedException('Invalid token');
          case 'NotBeforeError':
            throw new UnauthorizedException('Token not active');
          default:
            throw new UnauthorizedException(info.message);
        }
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
