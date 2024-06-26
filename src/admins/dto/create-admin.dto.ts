import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { RoleId } from 'src/common/enums/rolse';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Match('password')
  confirmPassword: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(RoleId)
  @IsInt()
  @IsNotEmpty()
  roleId: RoleId;
}
