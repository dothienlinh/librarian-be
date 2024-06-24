import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.adminRepository.save(createAdminDto);

    return plainToInstance(Admin, admin);
  }

  async findAll() {
    const admins = await this.adminRepository
      .createQueryBuilder('admin')
      .innerJoinAndSelect('admin.role', 'role')
      .getMany();

    return plainToInstance(Admin, admins);
  }

  findOne(id: number) {
    const admin = this.adminRepository.findOneBy({ id });

    return plainToInstance(Admin, admin);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminRepository.update({ id }, updateAdminDto);
  }

  async remove(id: number) {
    return await this.adminRepository.softDelete(id);
  }

  getTrash = async () => {
    return await this.adminRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  };

  restore = async (id: number) => {
    return await this.adminRepository.restore(id);
  };
}
