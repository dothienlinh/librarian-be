import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('admins')
export class Admin extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'role_id', type: 'int' })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.admins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
