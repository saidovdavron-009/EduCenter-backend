import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { ReportsController } from './reports.controller';
import { GetDashboardHandler } from './queries/get-dashboard/handler';
import { GetRevenueHandler } from './queries/get-revenue/handler';
import { GetAttendanceStatsHandler } from './queries/get-attendance/handler';
import { GetStudentsReportHandler } from './queries/get-students/handler';
import { GetTeachersReportHandler } from './queries/get-teachers/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [ReportsController],
  providers: [GetDashboardHandler, GetRevenueHandler, GetAttendanceStatsHandler, GetStudentsReportHandler, GetTeachersReportHandler],
})
export class ReportsModule {}