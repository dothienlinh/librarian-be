import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { authorId, categories, ...rest } = createBookDto;

    const authors = await this.authorRepository.find({
      where: { id: In(authorId) },
    });
    const findCategories = await this.categoriesRepository.find({
      where: { id: In(categories) },
    });

    const book = this.bookRepository.create({
      authors,
      categories: findCategories,
      ...rest,
    });

    return plainToInstance(Book, await this.bookRepository.save(book));
  }

  async findAll() {
    return plainToInstance(
      Book,
      await this.bookRepository.find({ relations: ['authors', 'categories'] }),
    );
  }

  async findOne(id: number) {
    return plainToInstance(Book, await this.bookRepository.findOneBy({ id }));
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const { categories } = updateBookDto;

    const updateCategories = await this.categoriesRepository.find({
      where: { id: In(categories) },
    });

    return this.bookRepository.update(
      { id },
      { ...updateBookDto, categories: updateCategories },
    );
  }

  remove(id: number) {
    return this.bookRepository.softDelete(id);
  }

  getTrash = async () => {
    return plainToInstance(
      Book,
      await this.bookRepository.find({
        withDeleted: true,
        where: { deletedAt: Not(IsNull()) },
      }),
    );
  };

  restore = async (id: number) => {
    return await this.bookRepository.restore(id);
  };
}
