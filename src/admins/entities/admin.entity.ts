import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('admins')
export class Admin extends BaseEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @ManyToOne(() => Role, (role) => role.admins)
  role: Role;
}
