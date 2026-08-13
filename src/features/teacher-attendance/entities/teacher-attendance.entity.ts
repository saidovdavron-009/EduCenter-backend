import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TeacherAttendanceStatus } from '../../../common/types';

@Entity('teacher_attendance')
export class TeacherAttendance {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'teacher_id', type: 'uuid' }) teacherId: string;
  @Column({ name: 'check_in', type: 'timestamptz', nullable: true }) checkIn: Date;
  @Column({ name: 'check_out', type: 'timestamptz', nullable: true }) checkOut: Date;
  @Column({ type: 'enum', enum: TeacherAttendanceStatus, nullable: true }) status: TeacherAttendanceStatus;
  @Column({ type: 'date' }) date: string;
  @Column({ nullable: true }) note: string;
}