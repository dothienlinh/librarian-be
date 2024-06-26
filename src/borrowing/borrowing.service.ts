import { Injectable } from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private readonly borrowingRepository: Repository<Borrowing>,
  ) {}
  async create(createBorrowingDto: CreateBorrowingDto) {
    const borrowing = this.borrowingRepository.create(createBorrowingDto);

    return plainToInstance(
      Borrowing,
      await this.borrowingRepository.save(borrowing),
    );
  }

  async findAll() {
    return plainToInstance(Borrowing, await this.borrowingRepository.find());
  }

  async findOne(id: number) {
    return plainToInstance(
      Borrowing,
      await this.borrowingRepository.findOneBy({ id }),
    );
  }

  update(id: number, updateBorrowingDto: UpdateBorrowingDto) {
    return this.borrowingRepository.update({ id }, updateBorrowingDto);
  }

  remove(id: number) {
    return this.borrowingRepository.softDelete({ id });
  }

  getTrash = async () => {
    return plainToInstance(
      Borrowing,
      await this.borrowingRepository.find({
        withDeleted: true,
        where: { deletedAt: Not(IsNull()) },
      }),
    );
  };

  restore = async (id: number) => {
    return await this.borrowingRepository.restore(id);
  };
}
