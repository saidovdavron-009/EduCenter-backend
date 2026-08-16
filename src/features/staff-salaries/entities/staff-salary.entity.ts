import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('staff_salaries')
export class StaffSalary {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'employee_id', type: 'uuid' }) employeeId: string;
  @Column({ name: 'base_amount', type: 'decimal', precision: 12, scale: 2 }) baseAmount: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) bonus: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) fine: number;
  @Column({ name: 'total_paid', type: 'decimal', precision: 12, scale: 2, default: 0 }) totalPaid: number;
  @Column({ name: 'period_start', type: 'date' }) periodStart: string;
  @Column({ name: 'period_end', type: 'date' }) periodEnd: string;
  @Column({ name: 'is_paid', default: false }) isPaid: boolean;
  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true }) paidAt: Date;
  @Column({ nullable: true }) note: string;
}
