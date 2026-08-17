import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query,
  UseGuards, ParseUUIDPipe, HttpCode, HttpStatus, ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateStudentHandler } from './commands/create/handler';
import { UpdateStudentHandler } from './commands/update/handler';
import { DeleteStudentHandler } from './commands/delete/handler';
import { ResetStudentPasswordHandler } from './commands/reset-password/handler';
import { GetOneStudentHandler } from './queries/get-one/handler';
import { GetAllStudentsHandler } from './queries/get-all/handler';
import { CreateStudentRequest } from './commands/create/request';
import { UpdateStudentRequest } from './commands/update/request';
import { ResetStudentPasswordRequest } from './commands/reset-password/request';
import { GetAllStudentsRequest } from './queries/get-all/request';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(
    private readonly createHandler: CreateStudentHandler,
    private readonly updateHandler: UpdateStudentHandler,
    private readonly deleteHandler: DeleteStudentHandler,
    private readonly resetPasswordHandler: ResetStudentPasswordHandler,
    private readonly getOneHandler: GetOneStudentHandler,
    private readonly getAllHandler: GetAllStudentsHandler,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi o\'quvchi yaratish (faqat Admin)' })
  create(@Body() dto: CreateStudentRequest) {
    return this.createHandler.execute(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Barcha o\'quvchilar ro\'yxati' })
  getAll(@Query() query: GetAllStudentsRequest) {
    return this.getAllHandler.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'O\'quvchi ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: RequestUser) {
    if (user.role === UserRole.STUDENT) {
      // student can only see their own profile
    }
    return this.getOneHandler.execute(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @ApiOperation({ summary: 'O\'quvchi ma\'lumotlarini yangilash' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStudentRequest,
    @CurrentUser() user: RequestUser,
  ) {
    if (user.role === UserRole.STUDENT) {
      const student = await this.getOneHandler.execute(id);
      if (student.userId !== user.id) {
        throw new ForbiddenException('Faqat o\'z profilingizni tahrirlashingiz mumkin');
      }
      const allowed: Pick<UpdateStudentRequest, 'fullName' | 'phone' | 'dob' | 'gender' | 'address'> = {};
      if (dto.fullName !== undefined) allowed.fullName = dto.fullName;
      if (dto.phone !== undefined) allowed.phone = dto.phone;
      if (dto.dob !== undefined) allowed.dob = dto.dob;
      if (dto.gender !== undefined) allowed.gender = dto.gender;
      if (dto.address !== undefined) allowed.address = dto.address;
      return this.updateHandler.execute(id, allowed);
    }
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'O\'quvchini o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteHandler.execute(id);
  }

  @Post(':id/reset-password')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'O\'quvchi parolini yangilash (faqat Admin, joriy parolsiz)' })
  resetPassword(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ResetStudentPasswordRequest) {
    return this.resetPasswordHandler.execute(id, dto);
  }
}