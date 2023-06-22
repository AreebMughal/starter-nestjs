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

  @Column({ type: 'text', name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'enum', enum: GENDER, nullable: false })
  gender: string;

  @Column({ type: 'text', nullable: false })
  dob: string;

  @Column({ type: 'text', nullable: false })
  address: string;
}
