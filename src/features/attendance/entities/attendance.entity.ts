import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { AttendanceStatus } from '../../../common/types';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'schedule_id', type: 'uuid' })
  scheduleId: string;

  // Shu davomat qaysi dars sessiyasiga (LessonSession) tegishli — mavjud
  // bo'lmasa (masalan schedule keyinroq o'zgargan bo'lsa) belgilanmasdan qoladi.
  @Column({ name: 'lesson_session_id', type: 'uuid', nullable: true })
  lessonSessionId: string | null;

  @Column({ name: 'student_id', type: 'uuid' })
  studentId: string;

  @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.PRESENT })
  status: AttendanceStatus;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  note: string;

  @Column({ name: 'marked_by', nullable: true, type: 'uuid' })
  markedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}