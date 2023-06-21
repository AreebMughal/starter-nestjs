import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity<T> {
  @Column({
    type: 'int',
    name: 'created_by'
  })
  createdBy: number;

  @Column({
    type: 'int',
    name: 'updated_by'
  })
  updatedBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
