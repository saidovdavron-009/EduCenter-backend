import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { SalaryType } from '../../../common/types';
import { User } from '../../auth/entities/user.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true, type: 'uuid' })
  userId: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'simple-array', nullable: true })
  subjects: string[];

  @Column({ type: 'int', nullable: true })
  experience: number;

  @Column({ name: 'salary_type', type: 'enum', enum: SalaryType, default: SalaryType.MONTHLY })
  salaryType: SalaryType;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  salary: number;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'hire_date', type: 'date', nullable: true })
  hireDate: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}