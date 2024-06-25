import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];
}
