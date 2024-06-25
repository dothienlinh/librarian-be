import { Author } from 'src/authors/entities/author.entity';
import { Borrowing } from 'src/borrowing/entities/borrowing.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  isbn: string;

  @Column({ type: 'varchar', nullable: true })
  publisher: string;

  @Column({ type: 'year', nullable: true })
  year: number;

  @Column({ type: 'int', nullable: true })
  copies: number;

  @ManyToMany(() => Author, { cascade: true })
  @JoinTable()
  authors: Author[];

  @ManyToOne(() => Borrowing, (borrowing) => borrowing.books)
  borrowing: Borrowing;
}
