import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { GetTeacherPayrollEntriesHandler } from './queries/get-entries/handler';
import { GetMonthlyPayrollSummaryHandler } from './queries/get-monthly-summary/handler';
import { GetTeacherPayrollReportHandler } from './queries/get-teacher-report/handler';
import { LockMonthlyPayrollHandler } from './commands/lock-month/handler';
import { AddPayrollCorrectionHandler } from './commands/add-correction/handler';
import { GetTeacherPayrollEntriesRequest } from './queries/get-entries/request';
import { GetMonthlyPayrollSummaryRequest } from './queries/get-monthly-summary/request';
import { GetTeacherPayrollReportRequest } from './queries/get-teacher-report/request';
import { LockMonthlyPayrollRequest } from './commands/lock-month/request';
import { AddPayrollCorrectionRequest } from './commands/add-correction/request';

@ApiTags('Teacher Payroll')
@ApiBearerAuth()
@Controller('teacher-payroll')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class TeacherPayrollController {
  constructor(
    private readonly getEntriesHandler: GetTeacherPayrollEntriesHandler,
    private readonly getMonthlySummaryHandler: GetMonthlyPayrollSummaryHandler,
    private readonly getTeacherReportHandler: GetTeacherPayrollReportHandler,
    private readonly lockMonthHandler: LockMonthlyPayrollHandler,
    private readonly addCorrectionHandler: AddPayrollCorrectionHandler,
  ) {}

  @Get('entries')
  @ApiOperation({ summary: "Har bir dars uchun yozilgan to'lov yozuvlari" })
  getEntries(@Query() query: GetTeacherPayrollEntriesRequest) {
    return this.getEntriesHandler.execute(query);
  }

  @Get('summary')
  @ApiOperation({ summary: "O'qituvchining oylik hisoboti (qulflangan bo'lsa muzlatilgan, bo'lmasa jonli hisoblanadi)" })
  getSummary(@Query() query: GetMonthlyPayrollSummaryRequest) {
    return this.getMonthlySummaryHandler.execute(query);
  }

  @Get('teacher-report')
  @ApiOperation({ summary: "O'qituvchi bo'yicha: shu oy nechta dars o'tgan, nechta qoldirgan, nechta boshqa guruhda almashtirgan" })
  getTeacherReport(@Query() query: GetTeacherPayrollReportRequest) {
    return this.getTeacherReportHandler.execute(query);
  }

  @Post('lock')
  @ApiOperation({ summary: "Oylik hisobotni yakunlab qulflash" })
  lock(@Body() dto: LockMonthlyPayrollRequest, @CurrentUser() user: RequestUser) {
    return this.lockMonthHandler.execute(dto, user.id);
  }

  @Post('corrections')
  @ApiOperation({ summary: "Qulflangan hisobotga tuzatuv qo'shish" })
  addCorrection(@Body() dto: AddPayrollCorrectionRequest, @CurrentUser() user: RequestUser) {
    return this.addCorrectionHandler.execute(dto, user.id);
  }
}
