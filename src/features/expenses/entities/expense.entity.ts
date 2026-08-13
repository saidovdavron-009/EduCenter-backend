import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ExpenseCategory } from '../../../common/types';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'enum', enum: ExpenseCategory }) category: ExpenseCategory;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) amount: number;
  @Column({ nullable: true }) description: string;
  @Column({ type: 'date' }) date: Date;
  @Column({ name: 'created_by', nullable: true, type: 'uuid' }) createdBy: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}