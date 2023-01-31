import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';

import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'UNAUTHORIZED' });
      }

      try {
        this.jwtService.verify(token);
      } catch (e) {
        throw new UnauthorizedException({ message: 'UNAUTHORIZED' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      if (e.status === 401) {
        throw new UnauthorizedException({ message: 'UNAUTHORIZED' });
      } else {
        throw new ForbiddenException({ message: 'FORBIDDEN' });
      }
    }
  }
}
