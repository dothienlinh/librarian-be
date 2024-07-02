import { Exclude } from 'class-transformer';
import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { StatusBorrowing } from 'src/common/enums/statusBorrowing';
import { Member } from 'src/members/entities/member.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('borrowing')
export class Borrowing extends BaseEntity {
  @Exclude()
  @Column({ type: 'int', name: 'book_id' })
  bookId: number;

  @Exclude()
  @Column({ type: 'int', name: 'member_id' })
  memberId: number;

  @Column({ type: 'date', name: 'borrow_date' })
  borrowDate: Date;

  @Column({ type: 'date', name: 'return_date' })
  returnDate: Date;

  @Column({ type: 'enum', enum: StatusBorrowing })
  status: StatusBorrowing;

  @ManyToOne(() => Member, (member) => member.borrowings)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Book, (book) => book.borrowing)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
