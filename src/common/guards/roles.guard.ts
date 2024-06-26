import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleId, RoleName } from '../enums/rolse';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IAdmin } from '../interfaces/admin.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { admin }: { admin: IAdmin } = context.switchToHttp().getRequest();
    const roleAdmin = admin.role;

    if (roleAdmin.id === RoleId.SUPER_ADMIN) return true;

    return requiredRoles.some((role) => role?.includes(roleAdmin.name));
  }
}
