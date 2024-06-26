import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { CreateAdminDto } from 'src/admins/dto/create-admin.dto';
import { RoleId, RoleName } from 'src/common/enums/rolse';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(
    private readonly adminsService: AdminsService,

    private readonly rolesService: RolesService,
  ) {}
  async onModuleInit() {
    await this.ensureRolesExist();
    await this.ensureAdminsExist();
  }

  async ensureRolesExist() {
    const [superAdminRole, normalAdminRole] = await Promise.all([
      this.rolesService.findOne(RoleId.SUPER_ADMIN),
      this.rolesService.findOne(RoleId.NORMAL_ADMIN),
    ]);

    if (!superAdminRole) {
      await this.rolesService.create({ name: RoleName.SUPER_ADMIN });
    }

    if (!normalAdminRole) {
      await this.rolesService.create({ name: RoleName.NORMAL_ADMIN });
    }
  }

  async ensureAdminsExist() {
    const isExist = await this.adminsService.isExistAdmin();

    if (!isExist) {
      const password = '123456';
      const createAdminDto: CreateAdminDto = {
        email: 'admin@gmail.com',
        name: 'super admin',
        password: password,
        roleId: RoleId.SUPER_ADMIN,
      };
      return await this.adminsService.create(createAdminDto);
    }
  }
}
