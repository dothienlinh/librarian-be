import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const createAuthor = await this.authorRepository.save(createAuthorDto);
    return plainToInstance(Author, createAuthor);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOneBy({ id });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepository.update({ id }, updateAuthorDto);
  }

  async remove(id: number) {
    return await this.authorRepository.softDelete(id);
  }

  getTrash = async () => {
    return await this.authorRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  };

  restore = async (id: number) => {
    return await this.authorRepository.restore(id);
  };
}
