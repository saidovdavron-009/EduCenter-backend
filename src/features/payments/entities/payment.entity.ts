import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethod, PaymentStatus } from '../../../common/types';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'student_id', type: 'uuid' }) studentId: string;
  @Column({ name: 'group_id', nullable: true, type: 'uuid' }) groupId: string;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) amount: number;
  @Column({ type: 'enum', enum: PaymentMethod }) method: PaymentMethod;
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PAID }) status: PaymentStatus;
  @Column({ nullable: true }) description: string;
  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true }) paidAt: Date;
  @Column({ name: 'due_date', type: 'date', nullable: true }) dueDate: Date;
  @Column({ name: 'receipt_url', nullable: true }) receiptUrl: string;
  @Column({ type: 'int', nullable: true }) month: number;
  @Column({ type: 'int', nullable: true }) year: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) discount: number;
  @Column({ name: 'received_by', nullable: true, type: 'uuid' }) receivedBy: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}