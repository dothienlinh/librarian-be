import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('authors')
export class Author extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'date' })
  birthdate: Date;
}
