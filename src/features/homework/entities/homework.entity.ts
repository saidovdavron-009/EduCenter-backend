import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('homework_assignments')
export class Homework {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'group_id', type: 'uuid' }) groupId: string;
  @Column({ name: 'teacher_id', type: 'uuid' }) teacherId: string;
  @Column() title: string;
  @Column({ type: 'text', nullable: true }) description: string;
  @Column({ name: 'due_date', type: 'date' }) dueDate: Date;
  @Column({ name: 'max_score', type: 'decimal', precision: 6, scale: 2, default: 100 }) maxScore: number;
  @Column({ name: 'attachment_url', nullable: true }) attachmentUrl: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}

@Entity('homework_submissions')
export class HomeworkSubmission {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'homework_id', type: 'uuid' }) homeworkId: string;
  @Column({ name: 'student_id', type: 'uuid' }) studentId: string;
  @Column({ type: 'text', nullable: true }) text: string;
  @Column({ name: 'file_url', nullable: true }) fileUrl: string;
  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true }) score: number;
  @Column({ nullable: true }) feedback: string;
  @Column({ name: 'submitted_at', type: 'timestamptz', default: () => 'NOW()' }) submittedAt: Date;
  @Column({ name: 'graded_at', type: 'timestamptz', nullable: true }) gradedAt: Date;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}