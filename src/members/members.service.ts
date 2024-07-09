import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const member = this.memberRepository.create(createMemberDto);

    return plainToInstance(Member, await this.memberRepository.save(member));
  }

  async findAll(page: number, name: string) {
    const [members, total] = await this.memberRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      take: 10,
      skip: (page - 1) * 10,
    });

    return {
      members: plainToInstance(Member, members),
      total,
    };
  }

  async findOne(id: number) {
    return plainToInstance(Member, this.memberRepository.findOneBy({ id }));
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.memberRepository.update({ id }, updateMemberDto);
  }

  remove(id: number) {
    return this.memberRepository.softDelete({ id });
  }

  getTrash = async () => {
    const [trash, total] = await this.memberRepository.findAndCount({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });

    return {
      trash: instanceToPlain(trash, { groups: ['trash'] }),
      total,
    };
  };

  restore = async (id: number) => {
    return await this.memberRepository.restore(id);
  };

  delete = async (id: number) => {
    const idSoftDelete = await this.memberRepository.findOne({
      where: {
        id,
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });

    if (!idSoftDelete) {
      throw new BadRequestException('Member cannot delete!');
    }

    return await this.memberRepository.delete({ id });
  };

  deleteAll = async () => {
    return await this.memberRepository
      .createQueryBuilder()
      .delete()
      .from(Member)
      .execute();
  };

  createsMultipleMember = async (createMemberDtos: CreateMemberDto[]) => {
    return await this.memberRepository
      .createQueryBuilder()
      .insert()
      .into(Member)
      .values(createMemberDtos)
      .execute();
  };

  getAllMembers = async () => {
    return plainToInstance(Member, await this.memberRepository.find());
  };

  getCount = async () => {
    return {
      count: await this.memberRepository.count(),
    };
  };
}
