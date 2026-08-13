import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus, ForbiddenException } from '@nestjs/common';
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
import { MarkAttendanceHandler } from './commands/mark/handler';
import { MarkBulkAttendanceHandler } from './commands/mark-bulk/handler';
import { UpdateAttendanceHandler } from './commands/update/handler';
import { GetAllAttendanceHandler } from './queries/get-all/handler';
import { GetAttendanceReportHandler } from './queries/get-report/handler';
import { GetMonthlyAttendanceHandler } from './queries/get-monthly/handler';
import { MarkAttendanceRequest } from './commands/mark/request';
import { MarkBulkAttendanceRequest } from './commands/mark-bulk/request';
import { UpdateAttendanceRequest } from './commands/update/request';
import { GetAllAttendanceRequest } from './queries/get-all/request';
import { GetAttendanceReportRequest } from './queries/get-report/request';
import { GetMonthlyAttendanceRequest } from './queries/get-monthly/request';

@ApiTags('Attendance')
@ApiBearerAuth()
@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(
    private readonly markHandler: MarkAttendanceHandler,
    private readonly markBulkHandler: MarkBulkAttendanceHandler,
    private readonly updateHandler: UpdateAttendanceHandler,
    private readonly getAllHandler: GetAllAttendanceHandler,
    private readonly getReportHandler: GetAttendanceReportHandler,
    private readonly getMonthlyHandler: GetMonthlyAttendanceHandler,
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
      const link = await this.studentParentRepo.findOne({ where: { studentId: requestedStudentId } });
      if (!link) throw new ForbiddenException('Ruxsat yo\'q');
      const parent = await this.studentParentRepo.manager.query(
        `SELECT 1 FROM student_parents sp JOIN parents p ON p.id = sp.parent_id WHERE sp.student_id = $1 AND p.user_id = $2`,
        [requestedStudentId, user.id],
      );
      if (!parent.length) throw new ForbiddenException('Ruxsat yo\'q');
      return requestedStudentId;
    }
    return requestedStudentId as string;
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.PARENT)
  @ApiOperation({ summary: 'Barcha davomat ma\'lumotlari' })
  async getAll(@Query() query: GetAllAttendanceRequest, @CurrentUser() user: RequestUser) {
    if (user.role === UserRole.STUDENT || user.role === UserRole.PARENT) {
      query.studentId = await this.resolveOwnStudentId(user, query.studentId);
    }
    return this.getAllHandler.execute(query);
  }

  @Get('report')
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.PARENT)
  @ApiOperation({ summary: 'Davomat hisoboti' })
  async getReport(@Query() query: GetAttendanceReportRequest, @CurrentUser() user: RequestUser) {
    if (user.role === UserRole.STUDENT || user.role === UserRole.PARENT) {
      query.studentId = await this.resolveOwnStudentId(user, query.studentId);
    }
    return this.getReportHandler.execute(query);
  }

  @Get('monthly')
  @ApiOperation({ summary: 'Oylik davomat' })
  getMonthly(@Query() query: GetMonthlyAttendanceRequest) { return this.getMonthlyHandler.execute(query); }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Davomat belgilash' })
  mark(@Body() dto: MarkAttendanceRequest, @CurrentUser() user: RequestUser) {
    return this.markHandler.execute(dto, user.id);
  }

  @Post('bulk')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Ommaviy davomat belgilash' })
  markBulk(@Body() dto: MarkBulkAttendanceRequest, @CurrentUser() user: RequestUser) {
    return this.markBulkHandler.execute(dto, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Davomatni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAttendanceRequest) {
    return this.updateHandler.execute(id, dto);
  }
}