import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToMany(() => Book)
  books: Book[];
}
