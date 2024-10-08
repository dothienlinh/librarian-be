import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('admins')
@Check(`"role_id" IN (1, 2)`)
export class Admin extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ type: 'text', nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Exclude()
  @Column({ name: 'role_id', type: 'int' })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.admins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
