import { Admin } from 'src/admins/entities/admin.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { RoleName } from 'src/common/enums/rolse';
import { Check, Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
@Check(`"id IN (0, 1)`)
export class Role extends BaseEntity {
  @Column({ type: 'enum', enum: RoleName })
  name: RoleName;

  @OneToMany(() => Admin, (admin) => admin.role)
  admins: Admin[];
}
