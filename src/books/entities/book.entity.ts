import { Author } from 'src/authors/entities/author.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

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
}
