import { Borrowing } from 'src/borrowing/entities/borrowing.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('members')
export class Member extends BaseEntity {
  @Column({ type: 'int', name: 'student_id', unique: true })
  studentId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'date', name: 'membership_date' })
  membershipDate: Date;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.member)
  borrowings: Borrowing[];
}
