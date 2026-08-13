import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany,
} from 'typeorm';
import { StudentStatus, Gender } from '../../../common/types';
import { User } from '../../auth/entities/user.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true, type: 'uuid' })
  userId: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  address: string;

  @Column()
  phone: string;

  @Column({ name: 'parent_phone', nullable: true })
  parentPhone: string;

  @Column({ name: 'parent_email', nullable: true })
  parentEmail: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ type: 'enum', enum: StudentStatus, default: StudentStatus.ACTIVE })
  status: StudentStatus;

  @Column({ name: 'referral_source', nullable: true })
  referralSource: string;

  @Column({ name: 'trial_date', type: 'date', nullable: true })
  trialDate: Date;

  @Column({ name: 'contract_number', nullable: true })
  contractNumber: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity('group_students')
export class GroupStudent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'group_id', type: 'uuid' })
  groupId: string;

  @Column({ name: 'student_id', type: 'uuid' })
  studentId: string;

  @Column({ name: 'joined_at', type: 'date', default: () => 'CURRENT_DATE' })
  joinedAt: Date;

  @Column({ name: 'left_at', type: 'date', nullable: true })
  leftAt: Date;

  @Column({ default: 'ACTIVE' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}