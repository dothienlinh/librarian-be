import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { Book } from 'src/books/entities/book.entity';
import { Member } from 'src/members/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing, Book, Member])],
  controllers: [BorrowingController],
  providers: [BorrowingService],
})
export class BorrowingModule {}
