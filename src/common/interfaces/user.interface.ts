import { RoleId, RoleName } from '../enums/rolse';

export interface IUser {
  id: number;
  name: string;
  email: string | null;
  role: {
    id: RoleId;
    name: RoleName;
  };
}
