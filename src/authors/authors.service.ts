import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const createAuthor = this.authorRepository.create(createAuthorDto);

    return plainToInstance(
      Author,
      await this.authorRepository.save(createAuthor),
    );
  }

  async findAll(page: number, name: string) {
    const [author, total] = await this.authorRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      take: 10,
      skip: (page - 1) * 10,
    });

    return {
      authors: plainToInstance(Author, author),
      total,
    };
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOneBy({ id });

    return plainToInstance(Author, author);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepository.update({ id }, updateAuthorDto);
  }

  async remove(id: number) {
    return await this.authorRepository.softDelete(id);
  }

  getTrash = async () => {
    return plainToInstance(
      Author,
      await this.authorRepository.find({
        withDeleted: true,
        where: { deletedAt: Not(IsNull()) },
      }),
    );
  };

  restore = async (id: number) => {
    return await this.authorRepository.restore(id);
  };

  findByName = async (name: string) => {
    const authors = await this.authorRepository.find({
      where: { name: Like(`%${name}%`) },
    });

    return plainToInstance(Author, authors);
  };

  findAllAuthors = async () => {
    return plainToInstance(Author, await this.authorRepository.find());
  };

  deleteAll = async () => {
    return await this.authorRepository
      .createQueryBuilder()
      .delete()
      .from(Author)
      .execute();
  };

  createsMultipleMember = async (createAuthorDto: CreateAuthorDto[]) => {
    return await this.authorRepository
      .createQueryBuilder()
      .insert()
      .into(Author)
      .values(createAuthorDto)
      .execute();
  };

  getCount = async () => {
    return {
      count: await this.authorRepository.count(),
    };
  };
}
