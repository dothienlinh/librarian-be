import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsInt()
  @IsOptional()
  year: number;

  @IsInt()
  @IsOptional()
  copies: number;

  @IsInt({ each: true })
  @IsNotEmpty()
  @IsArray()
  categories: number[];

  @IsInt({ each: true })
  @IsNotEmpty()
  @IsArray()
  authorId: number[];
}
