import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('members')
export class Member extends BaseEntity {
  @Column({ type: 'int', name: 'student_id' })
  studentId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'date' })
  membershipDate: Date;
}
