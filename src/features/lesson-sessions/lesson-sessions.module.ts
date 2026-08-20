import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonSession } from './entities/lesson-session.entity';
import { Group } from '../groups/entities/group.entity';
import { Schedule } from '../schedules/entities/schedule.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { GroupStudent, Student } from '../students/entities/student.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { TeacherPayrollEntry } from '../teacher-payroll/entities/teacher-payroll-entry.entity';
import { PayrollCalculatorService } from '../teacher-payroll/services/payroll-calculator.service';
import { SettingsModule } from '../settings/settings.module';
import { LessonSessionsController } from './lesson-sessions.controller';
import { LessonSessionResolverService } from './services/lesson-session-resolver.service';
import { LessonSessionCronService } from './services/lesson-session-cron.service';
import { GenerateLessonSessionsHandler } from './commands/generate/handler';
import { MarkLessonTeacherHandler } from './commands/mark-teacher/handler';
import { AssignSubstituteTeacherHandler } from './commands/assign-substitute/handler';
import { CancelLessonSessionHandler } from './commands/cancel/handler';
import { GetAllLessonSessionsHandler } from './queries/get-all/handler';
import { GetOneLessonSessionHandler } from './queries/get-one/handler';
import { GetTodayLessonSessionsHandler } from './queries/get-today/handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonSession, Group, Schedule, Teacher, GroupStudent, Student, Notification, TeacherPayrollEntry,
    ]),
    SettingsModule,
  ],
  controllers: [LessonSessionsController],
  providers: [
    LessonSessionResolverService,
    LessonSessionCronService,
    PayrollCalculatorService,
    GenerateLessonSessionsHandler,
    MarkLessonTeacherHandler,
    AssignSubstituteTeacherHandler,
    CancelLessonSessionHandler,
    GetAllLessonSessionsHandler,
    GetOneLessonSessionHandler,
    GetTodayLessonSessionsHandler,
  ],
  exports: [TypeOrmModule, LessonSessionResolverService],
})
export class LessonSessionsModule {}
