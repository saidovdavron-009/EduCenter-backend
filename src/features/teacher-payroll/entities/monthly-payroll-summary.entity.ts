import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

// Oy oxirida TeacherPayrollEntry'lar yig'indisidan "muzlatiladi". Qulflangandan
// (isLocked) keyin total_amount o'zgarmaydi — faqat [[teacher-payroll-correction]]
// orqali tuzatiladi.
@Entity('monthly_payroll_summaries')
@Index(['teacherId', 'year', 'month'], { unique: true })
export class MonthlyPayrollSummary {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'teacher_id', type: 'uuid' }) teacherId: string;
  @Column({ type: 'int' }) year: number;
  @Column({ type: 'int' }) month: number;
  @Column({ name: 'total_lessons_planned', type: 'int', default: 0 }) totalLessonsPlanned: number;
  @Column({ name: 'total_lessons_conducted', type: 'int', default: 0 }) totalLessonsConducted: number;
  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2, default: 0 }) totalAmount: number;
  @Column({ name: 'is_locked', default: false }) isLocked: boolean;
  @Column({ name: 'locked_at', type: 'timestamptz', nullable: true }) lockedAt: Date | null;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
