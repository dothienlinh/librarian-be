import { Exclude, Expose } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity as BaseEntityTypeOrm,
  DeleteDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends BaseEntityTypeOrm {
  @PrimaryGeneratedColumn()
  public id: number;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
  })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  public updatedAt: Date;

  @Expose({ groups: ['trash'], name: 'deleted_at' })
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  public deletedAt: Date;
}
