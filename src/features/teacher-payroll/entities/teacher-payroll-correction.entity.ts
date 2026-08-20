import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// Qulflangan MonthlyPayrollSummary'ni o'zgartirishning yagona yo'li — summa
// musbat (qo'shimcha) yoki manfiy (ushlab qolish) bo'lishi mumkin.
@Entity('teacher_payroll_corrections')
export class TeacherPayrollCorrection {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'monthly_payroll_summary_id', type: 'uuid' }) monthlyPayrollSummaryId: string;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) amount: number;
  @Column() reason: string;
  @Column({ name: 'created_by', type: 'uuid' }) createdBy: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
