import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);

    return plainToInstance(Role, await this.roleRepository.save(role));
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

  getTrash = async () => {
    const [trash, total] = await this.roleRepository.findAndCount({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });

    return {
      trash: instanceToPlain(trash, { groups: ['trash'] }),
      total,
    };
  };

  restore = async (id: number) => {
    return await this.roleRepository.restore(id);
  };

  delete = async (id: number) => {
    const idSoftDelete = await this.roleRepository.findOne({
      where: {
        id,
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });

    if (!idSoftDelete) {
      throw new BadRequestException('Role cannot delete!');
    }

    return await this.roleRepository.delete({ id });
  };
}
