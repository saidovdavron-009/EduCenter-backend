import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { LessonSessionStatus } from '../../../common/types';

// Har bir rejalashtirilgan dars kuni uchun yozuv — guruh jadvali (schedule)
// asosida generatsiya qilinadi (yoki davomat birinchi marta belgilanganda
// "lazy" yaratiladi). O'qituvchi maoshi ([[teacher-payroll]]) shu entity'ga
// bog'liq holda hisoblanadi, group.teacherId ga emas.
@Entity('lesson_sessions')
@Index(['groupId', 'date'], { unique: true })
export class LessonSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'group_id', type: 'uuid' })
  groupId: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ name: 'planned_start_time', type: 'time' })
  plannedStartTime: string;

  @Column({ name: 'planned_end_time', type: 'time' })
  plannedEndTime: string;

  // Generatsiya vaqtida group.teacherId dan olinadi.
  @Column({ name: 'assigned_teacher_id', type: 'uuid' })
  assignedTeacherId: string;

  // Darsni haqiqatda kim o'tgani — belgilanmagan bo'lsa null.
  @Column({ name: 'actual_teacher_id', type: 'uuid', nullable: true })
  actualTeacherId: string | null;

  @Column({ type: 'enum', enum: LessonSessionStatus, default: LessonSessionStatus.PLANNED })
  status: LessonSessionStatus;

  @Column({ name: 'attendance_marked_at', type: 'timestamptz', nullable: true })
  attendanceMarkedAt: Date | null;

  @Column({ name: 'is_substitution', default: false })
  isSubstitution: boolean;

  // "Davomat qilish" (mark-teacher) ni bosgan admin — audit uchun.
  @Column({ name: 'marked_by_admin_id', type: 'uuid', nullable: true })
  markedByAdminId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
