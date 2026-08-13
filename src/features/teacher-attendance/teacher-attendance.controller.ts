import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateTeacherAttendanceHandler } from './commands/create/handler';
import { UpdateTeacherAttendanceHandler } from './commands/update/handler';
import { DeleteTeacherAttendanceHandler } from './commands/delete/handler';
import { GetAllTeacherAttendanceHandler } from './queries/get-all/handler';
import { GetOneTeacherAttendanceHandler } from './queries/get-one/handler';
import { CreateTeacherAttendanceRequest } from './commands/create/request';
import { UpdateTeacherAttendanceRequest } from './commands/update/request';
import { GetAllTeacherAttendanceRequest } from './queries/get-all/request';

@ApiTags('Teacher Attendance')
@ApiBearerAuth()
@Controller('teacher-attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeacherAttendanceController {
  constructor(
    private readonly createHandler: CreateTeacherAttendanceHandler,
    private readonly updateHandler: UpdateTeacherAttendanceHandler,
    private readonly deleteHandler: DeleteTeacherAttendanceHandler,
    private readonly getAllHandler: GetAllTeacherAttendanceHandler,
    private readonly getOneHandler: GetOneTeacherAttendanceHandler,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'O\'qituvchi davomati qo\'shish' })
  create(@Body() dto: CreateTeacherAttendanceRequest) {
    return this.createHandler.execute(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Barcha o\'qituvchi davomatlari' })
  getAll(@Query() query: GetAllTeacherAttendanceRequest) {
    return this.getAllHandler.execute(query);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'O\'qituvchi davomati' })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneHandler.execute(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'O\'qituvchi davomatini yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTeacherAttendanceRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'O\'qituvchi davomatini o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteHandler.execute(id);
  }
}
