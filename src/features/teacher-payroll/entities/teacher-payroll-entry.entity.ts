import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

// Har bir o'tilgan (CONDUCTED) lesson_session uchun avtomatik yaratiladigan
// yozuv — teacherId doim shu darsni HAQIQATDA o'tgan o'qituvchi (LessonSession.actualTeacherId).
@Entity('teacher_payroll_entries')
@Index(['lessonSessionId'], { unique: true })
export class TeacherPayrollEntry {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'lesson_session_id', type: 'uuid' }) lessonSessionId: string;
  @Column({ name: 'teacher_id', type: 'uuid' }) teacherId: string;
  @Column({ name: 'group_id', type: 'uuid' }) groupId: string;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) amount: number;
  @Column({ type: 'date' }) date: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
