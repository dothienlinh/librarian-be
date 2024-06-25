import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing])],
  controllers: [BorrowingController],
  providers: [BorrowingService],
})
export class BorrowingModule {}
