import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { Student } from '../students/entities/student.entity';
import { StudentParent } from '../parents/entities/parent.entity';
import { CreatePaymentHandler } from './commands/create/handler';
import { UpdatePaymentHandler } from './commands/update/handler';
import { DeletePaymentHandler } from './commands/delete/handler';
import { GetAllPaymentsHandler } from './queries/get-all/handler';
import { GetOnePaymentHandler } from './queries/get-one/handler';
import { GetPaymentDashboardHandler } from './queries/get-dashboard/handler';
import { GetPaymentReportHandler } from './queries/get-report/handler';
import { CreatePaymentRequest } from './commands/create/request';
import { UpdatePaymentRequest } from './commands/update/request';
import { GetAllPaymentsRequest } from './queries/get-all/request';
import { GetPaymentReportRequest } from './queries/get-report/request';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(
    private readonly createHandler: CreatePaymentHandler,
    private readonly updateHandler: UpdatePaymentHandler,
    private readonly deleteHandler: DeletePaymentHandler,
    private readonly getAllHandler: GetAllPaymentsHandler,
    private readonly getOneHandler: GetOnePaymentHandler,
    private readonly getDashboardHandler: GetPaymentDashboardHandler,
    private readonly getReportHandler: GetPaymentReportHandler,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(StudentParent) private readonly studentParentRepo: Repository<StudentParent>,
  ) {}

  /** STUDENT/PARENT can only ever see their own (or their linked child's) records — never an arbitrary studentId. */
  private async resolveOwnStudentId(user: RequestUser, requestedStudentId?: string): Promise<string> {
    if (user.role === UserRole.STUDENT) {
      const student = await this.studentRepo.findOne({ where: { userId: user.id } });
      if (!student) throw new ForbiddenException('O\'quvchi profili topilmadi');
      return student.id;
    }
    if (user.role === UserRole.PARENT) {
      if (!requestedStudentId) throw new ForbiddenException('studentId ko\'rsatilishi shart');
      const link = await this.studentParentRepo.manager.query(
        `SELECT 1 FROM student_parents sp JOIN parents p ON p.id = sp.parent_id WHERE sp.student_id = $1 AND p.user_id = $2`,
        [requestedStudentId, user.id],
      );
      if (!link.length) throw new ForbiddenException('Ruxsat yo\'q');
      return requestedStudentId;
    }
    return requestedStudentId as string;
  }

  @Get('dashboard')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'To\'lov dashboard' })
  getDashboard() { return this.getDashboardHandler.execute(); }

  @Get('report')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Moliyaviy hisobot' })
  getReport(@Query() query: GetPaymentReportRequest) { return this.getReportHandler.execute(query); }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STUDENT, UserRole.PARENT)
  @ApiOperation({ summary: 'Barcha to\'lovlar' })
  async getAll(@Query() query: GetAllPaymentsRequest, @CurrentUser() user: RequestUser) {
    if (user.role === UserRole.STUDENT || user.role === UserRole.PARENT) {
      query.studentId = await this.resolveOwnStudentId(user, query.studentId);
    }
    return this.getAllHandler.execute(query);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'To\'lov ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'To\'lov qabul qilish' })
  create(@Body() dto: CreatePaymentRequest, @CurrentUser() user: RequestUser) {
    return this.createHandler.execute(dto, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'To\'lovni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePaymentRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'To\'lovni o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}