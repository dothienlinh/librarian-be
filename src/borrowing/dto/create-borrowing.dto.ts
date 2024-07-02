import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBorrowingDto {
  @IsInt()
  @IsNotEmpty()
  bookId: number;

  @IsInt()
  @IsNotEmpty()
  memberId: number;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  returnDate: Date;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  borrowDate: Date;
}
