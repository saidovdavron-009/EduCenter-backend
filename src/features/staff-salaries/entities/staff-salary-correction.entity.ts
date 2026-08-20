import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// To'langan (isPaid=true) staff_salaries yozuvini o'zgartirishning yagona
// yo'li — teacher-payroll'dagi correction bilan bir xil g'oya: asl yozuv
// saqlanib qoladi, faqat tuzatuv qo'shiladi (audit maqsadida).
@Entity('staff_salary_corrections')
export class StaffSalaryCorrection {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'staff_salary_id', type: 'uuid' }) staffSalaryId: string;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) amount: number;
  @Column() reason: string;
  @Column({ name: 'created_by', type: 'uuid' }) createdBy: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
