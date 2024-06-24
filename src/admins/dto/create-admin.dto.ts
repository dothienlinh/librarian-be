import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { RoleId } from 'src/common/enums/rolse';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(RoleId)
  @IsInt()
  @IsNotEmpty()
  roleId: RoleId;
}
