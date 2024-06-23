import { IsEnum, IsString } from 'class-validator';
import { RoleName } from 'src/enums/rolse';

export class CreateRoleDto {
  @IsString()
  @IsEnum(RoleName)
  name: RoleName;
}
