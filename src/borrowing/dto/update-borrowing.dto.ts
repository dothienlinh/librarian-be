import { PartialType } from '@nestjs/swagger';
import { CreateBorrowingDto } from './create-borrowing.dto';
import { StatusBorrowing } from 'src/common/enums/statusBorrowing';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateBorrowingDto extends PartialType(CreateBorrowingDto) {
  @IsEnum(StatusBorrowing)
  @IsNotEmpty()
  status: StatusBorrowing;
}
