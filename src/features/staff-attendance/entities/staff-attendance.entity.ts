import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TeacherAttendanceStatus } from '../../../common/types';

// O'qituvchi bo'lmagan xodimlar (admin, resepshin va h.k.) uchun kunlik
// ish davomati. Xuddi teacher_attendance kabi — kelmasa maosh shu kunga
// yozilmaydi (see [[staff-salaries]] hisoblash).
@Entity('staff_attendance')
export class StaffAttendance {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'user_id', type: 'uuid' }) userId: string;
  @Column({ name: 'check_in', type: 'timestamptz', nullable: true }) checkIn: Date;
  @Column({ name: 'check_out', type: 'timestamptz', nullable: true }) checkOut: Date;
  @Column({ type: 'enum', enum: TeacherAttendanceStatus, nullable: true }) status: TeacherAttendanceStatus;
  @Column({ type: 'date' }) date: string;
  @Column({ nullable: true }) note: string;

  // Belgilash shu oraliqda amalga oshirilishi kerak bo'lgan ish vaqti — yaratishda
  // common/constants/work-hours dan olinadi, lekin har bir yozuvda saqlanadi
  // (kelgusida xodim/filial bo'yicha turli ish vaqtlariga moslashuvchan bo'lishi uchun).
  @Column({ name: 'planned_start_time', type: 'time', nullable: true }) plannedStartTime: string | null;
  @Column({ name: 'planned_end_time', type: 'time', nullable: true }) plannedEndTime: string | null;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
