import { Author } from 'src/authors/entities/author.entity';
import { Borrowing } from 'src/borrowing/entities/borrowing.entity';
import { Category } from 'src/categories/entities/category.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { StatusBorrowing } from 'src/common/enums/statusBorrowing';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', unique: true })
  isbn: string;

  @Column({ type: 'varchar', nullable: true })
  publisher: string;

  @Column({ type: 'year', nullable: true })
  year: number;

  @Column({ type: 'int', nullable: true })
  copies: number;

  @Column({
    type: 'enum',
    enum: StatusBorrowing,
    default: StatusBorrowing.RETURN,
  })
  status: number;

  @ManyToMany(() => Author, { cascade: true })
  @JoinTable({
    name: 'books_authors',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'id',
    },
  })
  authors: Author[];

  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  @JoinColumn({ name: 'borrowing_id' })
  borrowing: Borrowing;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable({
    name: 'books_categories',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}
