import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE_TYPE } from 'src/constants';
import { BaseEntity } from './base.entity';
import { Profile } from './profile.entity';

@Entity({
  name: 'tbl_user'
})
export class User extends BaseEntity<User> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ROLE_TYPE,
    nullable: false
  })
  role: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({
    type: 'text'
  })
  password: string;

  @Column({
    type: 'bool',
    default: false,
    name: 'is_email_verified'
  })
  isEmailVerified: boolean;

  @OneToOne(() => Profile, (profile) => profile.userId)
  profile: Profile;
}
