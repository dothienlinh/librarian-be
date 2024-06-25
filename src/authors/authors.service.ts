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
    const createAuthor = this.authorRepository.create(createAuthorDto);

    return plainToInstance(
      Author,
      await this.authorRepository.save(createAuthor),
    );
  }

  async findAll() {
    const authors = await this.authorRepository.find();

    return plainToInstance(Author, authors);
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
    return await this.authorRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  };

  restore = async (id: number) => {
    return await this.authorRepository.restore(id);
  };
}
