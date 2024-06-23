import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.save(createRoleDto);

    return plainToInstance(Role, role);
  }

  async findAll() {
    const roles = await this.roleRepository.find();

    return plainToInstance(Role, roles);
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOneBy({ id });

    return plainToInstance(Role, role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepository.update({ id }, updateRoleDto);
  }

  async remove(id: number) {
    return await this.roleRepository.softDelete(id);
  }
}
