import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { GradeType } from '../../../common/types';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'student_id', type: 'uuid' }) studentId: string;
  @Column({ name: 'teacher_id', type: 'uuid' }) teacherId: string;
  @Column({ name: 'group_id', nullable: true, type: 'uuid' }) groupId: string;
  @Column({ type: 'enum', enum: GradeType }) type: GradeType;
  @Column({ type: 'decimal', precision: 6, scale: 2 }) score: number;
  @Column({ name: 'max_score', type: 'decimal', precision: 6, scale: 2, default: 100 }) maxScore: number;
  @Column({ nullable: true }) comment: string;
  @Column({ type: 'date' }) date: Date;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}