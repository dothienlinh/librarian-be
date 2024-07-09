import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { In, IsNull, Like, Not, Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
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

  async findAll(page: number, title: string) {
    const [books, total] = await this.bookRepository.findAndCount({
      where: { title: Like(`%${title}%`) },
      take: 10,
      skip: (page - 1) * 10,
    });

    return {
      books: plainToInstance(Book, books),
      total,
    };
  }

  async findOne(id: number) {
    return plainToInstance(
      Book,
      await this.bookRepository
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.authors', 'authors')
        .leftJoinAndSelect('book.categories', 'categories')
        .where('book.id = :id', { id })
        .getOne(),
    );
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const { categories, authorId, ...updateData } = updateBookDto;

    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['categories', 'authors'],
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const updateAuthors = await this.authorRepository.find({
      where: { id: In(authorId) },
    });

    const updateCategories = await this.categoriesRepository.find({
      where: { id: In(categories) },
    });

    book.authors = updateAuthors;
    book.categories = updateCategories;
    Object.assign(book, updateData);

    return this.bookRepository.save(book);
  }

  remove(id: number) {
    return this.bookRepository.softDelete(id);
  }

  getTrash = async () => {
    const [trash, total] = await this.bookRepository.findAndCount({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });

    return {
      trash: instanceToPlain(trash, { groups: ['trash'] }),
      total,
    };
  };

  restore = async (id: number) => {
    return await this.bookRepository.restore(id);
  };

  delete = async (id: number) => {
    const idSoftDelete = await this.bookRepository.findOne({
      where: {
        id,
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });

    if (!idSoftDelete) {
      throw new BadRequestException('Book cannot delete!');
    }

    return await this.bookRepository.delete({ id });
  };

  deleteAll = async () => {
    return await this.categoriesRepository
      .createQueryBuilder()
      .delete()
      .from(Book)
      .execute();
  };

  createsMultipleBook = async (createBookDtos: CreateBookDto[]) => {
    const books = await Promise.all(
      createBookDtos.map(async (createBookDto) => {
        const { authorId, categories, ...rest } = createBookDto;

        const authors = await this.authorRepository.find({
          where: { id: In(authorId) },
        });

        const findCategories = await this.categoriesRepository.find({
          where: { id: In(categories) },
        });

        return this.bookRepository.create({
          ...rest,
          authors,
          categories: findCategories,
        });
      }),
    );

    return await this.bookRepository.save(books);
  };

  getAllBooks = async () => {
    return plainToInstance(
      Book,
      await this.bookRepository.find({
        relations: ['authors', 'categories'],
      }),
    );
  };

  getCount = async () => {
    return {
      count: await this.bookRepository.count(),
    };
  };
}
