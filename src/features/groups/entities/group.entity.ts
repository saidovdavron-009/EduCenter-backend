import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { GroupStatus } from '../../../common/types';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'subject_id', type: 'uuid' })
  subjectId: string;

  @Column({ name: 'teacher_id', type: 'uuid' })
  teacherId: string;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId: string;

  @Column({ type: 'int', default: 20 })
  capacity: number;

  @Column({ nullable: true })
  level: string;

  @Column({ name: 'monthly_fee', type: 'decimal', precision: 12, scale: 2, default: 0 })
  monthlyFee: number;

  // O'quvchi to'lovi (monthlyFee) EMAS — o'qituvchining shu guruhdan oladigan
  // oylik ulushi (fiks yoki shartnoma bo'yicha kelishilgan summa). Bitta dars
  // narxi = shu maydon / shu oydagi rejalashtirilgan darslar soni ([[teacher-payroll]]).
  @Column({ name: 'monthly_price_for_teacher', type: 'decimal', precision: 12, scale: 2, nullable: true })
  monthlyPriceForTeacher: number | null;

  @Column({ type: 'enum', enum: GroupStatus, default: GroupStatus.ACTIVE })
  status: GroupStatus;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}