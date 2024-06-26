import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('authors')
export class Author extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @ManyToMany(() => Book, { cascade: true })
  books: Book[];
}
