import { Injectable } from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { StatusBorrowing } from 'src/common/enums/statusBorrowing';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private readonly borrowingRepository: Repository<Borrowing>,
  ) {}
  async create(createBorrowingDto: CreateBorrowingDto) {
    const borrowing = this.borrowingRepository.create({
      ...createBorrowingDto,
      status: StatusBorrowing.BORROW,
    });

    return plainToInstance(
      Borrowing,
      await this.borrowingRepository.save(borrowing),
    );
  }

  async findAll(
    page: number,
    memberName: string,
    bookTitle: string,
    status: StatusBorrowing,
  ) {
    const query = this.borrowingRepository
      .createQueryBuilder('borrowing')
      .leftJoinAndSelect('borrowing.member', 'member')
      .leftJoinAndSelect('borrowing.book', 'book')
      .leftJoinAndSelect('book.authors', 'authors')
      .leftJoinAndSelect('book.categories', 'categories')
      .where('member.name LIKE :memberName', { memberName: `%${memberName}%` })
      .andWhere('book.title LIKE :bookTitle', { bookTitle: `%${bookTitle}%` });

    if (status) {
      query.andWhere('borrowing.status = :status', { status });
    }

    const [borrowings, totalRecords] = await query
      .take(10)
      .skip((page - 1) * 10)
      .getManyAndCount();

    return {
      borrowings: plainToInstance(Borrowing, borrowings),
      total: totalRecords,
    };
  }
  async findOne(id: number) {
    return plainToInstance(
      Borrowing,
      await this.borrowingRepository
        .createQueryBuilder('borrowing')
        .leftJoinAndSelect('borrowing.member', 'member')
        .leftJoinAndSelect('borrowing.book', 'book')
        .leftJoinAndSelect('book.authors', 'authors')
        .leftJoinAndSelect('book.categories', 'categories')
        .where('borrowing.id = :id', { id })
        .getOne(),
    );
  }

  update(id: number, updateBorrowingDto: UpdateBorrowingDto) {
    return this.borrowingRepository.update({ id }, updateBorrowingDto);
  }

  remove(id: number) {
    return this.borrowingRepository.softDelete({ id });
  }

  giveBookBack = async (id: number) => {
    return await this.borrowingRepository.update(
      { id },
      { status: StatusBorrowing.RETURN },
    );
  };
}
