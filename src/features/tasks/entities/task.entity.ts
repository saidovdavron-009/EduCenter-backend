import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TaskStatus, TaskPriority } from '../../../common/types';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() title: string;
  @Column({ nullable: true }) description: string;
  @Column({ name: 'assigned_to', nullable: true, type: 'uuid' }) assignedTo: string;
  @Column({ name: 'created_by', type: 'uuid' }) createdBy: string;
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO }) status: TaskStatus;
  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM }) priority: TaskPriority;
  @Column({ type: 'timestamptz', nullable: true }) deadline: Date;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}