import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../students/entities/student.entity';
import { StudentParent } from '../parents/entities/parent.entity';
import { Schedule } from '../schedules/entities/schedule.entity';
import { LessonSessionsModule } from '../lesson-sessions/lesson-sessions.module';
import { SettingsModule } from '../settings/settings.module';
import { AttendanceController } from './attendance.controller';
import { MarkAttendanceHandler } from './commands/mark/handler';
import { MarkBulkAttendanceHandler } from './commands/mark-bulk/handler';
import { UpdateAttendanceHandler } from './commands/update/handler';
import { GetAllAttendanceHandler } from './queries/get-all/handler';
import { GetAttendanceReportHandler } from './queries/get-report/handler';
import { GetMonthlyAttendanceHandler } from './queries/get-monthly/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student, StudentParent, Schedule]), LessonSessionsModule, SettingsModule],
  controllers: [AttendanceController],
  providers: [MarkAttendanceHandler, MarkBulkAttendanceHandler, UpdateAttendanceHandler, GetAllAttendanceHandler, GetAttendanceReportHandler, GetMonthlyAttendanceHandler],
  exports: [TypeOrmModule],
})
export class AttendanceModule {}