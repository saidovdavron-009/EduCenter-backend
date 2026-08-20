import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherPayrollEntry } from './entities/teacher-payroll-entry.entity';
import { MonthlyPayrollSummary } from './entities/monthly-payroll-summary.entity';
import { TeacherPayrollCorrection } from './entities/teacher-payroll-correction.entity';
import { LessonSession } from '../lesson-sessions/entities/lesson-session.entity';
import { Group } from '../groups/entities/group.entity';
import { Schedule } from '../schedules/entities/schedule.entity';
import { PayrollCalculatorService } from './services/payroll-calculator.service';
import { SettingsModule } from '../settings/settings.module';
import { TeacherPayrollController } from './teacher-payroll.controller';
import { GetTeacherPayrollEntriesHandler } from './queries/get-entries/handler';
import { GetMonthlyPayrollSummaryHandler } from './queries/get-monthly-summary/handler';
import { GetTeacherPayrollReportHandler } from './queries/get-teacher-report/handler';
import { LockMonthlyPayrollHandler } from './commands/lock-month/handler';
import { AddPayrollCorrectionHandler } from './commands/add-correction/handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeacherPayrollEntry, MonthlyPayrollSummary, TeacherPayrollCorrection, LessonSession, Group, Schedule,
    ]),
    SettingsModule,
  ],
  controllers: [TeacherPayrollController],
  providers: [
    PayrollCalculatorService,
    GetTeacherPayrollEntriesHandler,
    GetMonthlyPayrollSummaryHandler,
    GetTeacherPayrollReportHandler,
    LockMonthlyPayrollHandler,
    AddPayrollCorrectionHandler,
  ],
  exports: [TypeOrmModule],
})
export class TeacherPayrollModule {}
