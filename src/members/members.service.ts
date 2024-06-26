import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

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

  async findAll() {
    return plainToInstance(Member, await this.memberRepository.find());
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
    return plainToInstance(
      Member,
      await this.memberRepository.find({
        withDeleted: true,
        where: { deletedAt: Not(IsNull()) },
      }),
    );
  };

  restore = async (id: number) => {
    return await this.memberRepository.restore(id);
  };
}
