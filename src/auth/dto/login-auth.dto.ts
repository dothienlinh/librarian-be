import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'admin@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '123456' })
  password: string;
}
