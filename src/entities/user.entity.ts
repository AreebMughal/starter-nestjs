import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE_TYPE } from 'src/constants';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'tbl_user'
})
export class User extends BaseEntity<User> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
    name: 'user_name',
    nullable: true
  })
  userName: string;

  @Column({
    type: 'enum',
    enum: ROLE_TYPE,
    default: ROLE_TYPE.ADMIN,
    nullable: false
  })
  role: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', unique: true, nullable: true })
  phone: string;

  @Column({
    type: 'bool',
    default: false,
    name: 'is_email_verified'
  })
  isEmailVerified: boolean;

  @Column({
    type: 'text'
  })
  password: string;
}
