import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  membershipDate: Date;
}
