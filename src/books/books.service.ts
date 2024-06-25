import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);

    return await this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: number) {
    return this.bookRepository.findOneBy({ id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update({ id }, updateBookDto);
  }

  remove(id: number) {
    return this.bookRepository.softDelete(id);
  }

  getTrash = async () => {
    return await this.bookRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  };

  restore = async (id: number) => {
    return await this.bookRepository.restore(id);
  };
}
