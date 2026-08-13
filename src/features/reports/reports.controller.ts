import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { GetDashboardHandler } from './queries/get-dashboard/handler';
import { GetRevenueHandler } from './queries/get-revenue/handler';
import { GetAttendanceStatsHandler } from './queries/get-attendance/handler';
import { GetStudentsReportHandler } from './queries/get-students/handler';
import { GetTeachersReportHandler } from './queries/get-teachers/handler';
import { GetRevenueRequest } from './queries/get-revenue/request';
import { GetAttendanceStatsRequest } from './queries/get-attendance/request';
import { GetStudentsReportRequest } from './queries/get-students/request';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class ReportsController {
  constructor(
    private readonly getDashboardHandler: GetDashboardHandler,
    private readonly getRevenueHandler: GetRevenueHandler,
    private readonly getAttendanceHandler: GetAttendanceStatsHandler,
    private readonly getStudentsHandler: GetStudentsReportHandler,
    private readonly getTeachersHandler: GetTeachersReportHandler,
  ) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Bosh sahifa statistikasi' })
  getDashboard() { return this.getDashboardHandler.execute(); }

  @Get('revenue')
  @ApiOperation({ summary: 'Daromad hisoboti' })
  getRevenue(@Query() query: GetRevenueRequest) { return this.getRevenueHandler.execute(query); }

  @Get('attendance')
  @ApiOperation({ summary: 'Davomat statistikasi' })
  getAttendance(@Query() query: GetAttendanceStatsRequest) { return this.getAttendanceHandler.execute(query); }

  @Get('students')
  @ApiOperation({ summary: 'O\'quvchilar hisoboti' })
  getStudents(@Query() query: GetStudentsReportRequest) { return this.getStudentsHandler.execute(query); }

  @Get('teachers')
  @ApiOperation({ summary: 'O\'qituvchilar hisoboti' })
  getTeachers() { return this.getTeachersHandler.execute(); }
}