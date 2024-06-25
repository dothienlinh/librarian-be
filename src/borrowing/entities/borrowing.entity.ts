import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('borrowing')
export class Borrowing extends BaseEntity {
  @Column({ type: 'int', name: 'book_id' })
  bookId: number;

  @Column({ type: 'int', name: 'member_id' })
  memberId: number;

  @Column({ type: 'date', name: 'borrow_date' })
  borrowDate: Date;

  @Column({ type: 'date', name: 'return_date' })
  returnDate: Date;

  @OneToMany(() => Book, (book) => book.borrowing)
  books: Book[];
}
