import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { GENDER } from 'src/constants';
import { User } from './user.entity';

@Entity({
  name: 'tbl_profile'
})
export class Profile extends BaseEntity<Profile> {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column({ type: 'text', name: 'first_name' })
  firstName: string;

  @Column({ type: 'text', name: 'last_name' })
  lastName: string;

  @Column({ type: 'text', name: 'phone_number', default: '' })
  phoneNumber: string;

  @Column({ type: 'enum', enum: GENDER, nullable: false, default: GENDER.NULL })
  gender: string;

  @Column({ nullable: false, default: '' })
  dob: Date;

  @Column({ type: 'text', nullable: false, default: '' })
  address: string;
}
