import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { RoleId } from 'src/common/enums/rolse';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    delete createAdminDto.confirmPassword;

    const { password, ...rest } = createAdminDto;

    const maxAdmin = await this.adminRepository.count();

    if (maxAdmin > 5) {
      throw new BadRequestException('You can not create more than 5 admins!');
    }

    const isExist = await this.adminRepository.findOne({
      where: { email: rest.email },
      withDeleted: true,
    });

    if (isExist) {
      throw new BadRequestException(
        'The administrator already exists or is in the trash!',
      );
    }

    const hashPassword = await this.hashPassword(password);

    const admin = this.adminRepository.create({
      password: hashPassword,
      ...rest,
    });

    return plainToInstance(Admin, await this.adminRepository.save(admin));
  }

  async createsMultipleAdmin(createAdminDtos: CreateAdminDto[]) {
    return this.adminRepository
      .createQueryBuilder()
      .insert()
      .into(Admin)
      .values(createAdminDtos)
      .execute();
  }

  async findAll() {
    const admins = await this.adminRepository
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.role', 'role')
      .getMany();

    return plainToInstance(Admin, admins);
  }

  async findOne(id: number) {
    const admin = await this.adminRepository
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.role', 'role')
      .where('admin.id = :id', { id })
      .getOne();

    return plainToInstance(Admin, admin);
  }

  findByEmail = async (email: string) => {
    const admin = await this.adminRepository
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.role', 'role')
      .where('admin.email LIKE :email', { email })
      .getOne();

    return admin;
  };

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminRepository.update({ id }, updateAdminDto);
  }

  async remove(id: number) {
    return await this.adminRepository.softDelete(id);
  }

  getTrash = async () => {
    const [trash, total] = await this.adminRepository.findAndCount({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });

    return {
      trash: instanceToPlain(trash, { groups: ['trash'] }),
      total,
    };
  };

  restore = async (id: number) => {
    const maxAdmin = await this.adminRepository.count();

    if (maxAdmin > 5) {
      throw new BadRequestException(
        '5 admins have reached and cannot be restored!',
      );
    }

    return await this.adminRepository.restore(id);
  };

  delete = async (id: number) => {
    const idSoftDelete = await this.adminRepository.findOne({
      where: {
        id,
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });

    if (!idSoftDelete) {
      throw new BadRequestException('Admin cannot delete!');
    }

    return await this.adminRepository.delete({ id });
  };

  hashPassword = async (password: string): Promise<string> => {
    const salt = await genSaltSync();

    return await hashSync(password, salt);
  };

  verifyHashPassword = async (
    password: string,
    hashedPassword: string,
  ): Promise<boolean> => {
    return await compareSync(password, hashedPassword);
  };

  isExistAdmin = async () => {
    return await this.adminRepository.findOneBy({
      name: 'super admin',
      email: 'admin@gmail.com',
      roleId: RoleId.SUPER_ADMIN,
    });
  };

  updateRefreshToken = async (refreshToken: string, id: number) => {
    return await this.adminRepository.update({ id }, { refreshToken });
  };

  findByRefreshToken = async (refreshToken: string) => {
    const admin = await this.adminRepository
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.role', 'role')
      .where('admin.refresh_token = :refreshToken', { refreshToken })
      .getOne();

    return plainToInstance(Admin, admin);
  };

  deleteAllNormalAdmin = async () => {
    return await this.adminRepository
      .createQueryBuilder()
      .delete()
      .from(Admin)
      .where('role_id = :RoleId', { RoleId: RoleId.NORMAL_ADMIN })
      .execute();
  };

  countAdmin = async () => {
    return await this.adminRepository.count();
  };
}
