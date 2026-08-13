import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateTeacherSalaryHandler } from './commands/create/handler';
import { UpdateTeacherSalaryHandler } from './commands/update/handler';
import { DeleteTeacherSalaryHandler } from './commands/delete/handler';
import { PayTeacherSalaryHandler } from './commands/pay/handler';
import { GetAllTeacherSalariesHandler } from './queries/get-all/handler';
import { GetOneTeacherSalaryHandler } from './queries/get-one/handler';
import { CreateTeacherSalaryRequest } from './commands/create/request';
import { UpdateTeacherSalaryRequest } from './commands/update/request';
import { PayTeacherSalaryRequest } from './commands/pay/request';
import { GetAllTeacherSalariesRequest } from './queries/get-all/request';

@ApiTags('Teacher Salaries')
@ApiBearerAuth()
@Controller('teacher-salaries')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class TeacherSalariesController {
  constructor(
    private readonly createHandler: CreateTeacherSalaryHandler,
    private readonly updateHandler: UpdateTeacherSalaryHandler,
    private readonly deleteHandler: DeleteTeacherSalaryHandler,
    private readonly payHandler: PayTeacherSalaryHandler,
    private readonly getAllHandler: GetAllTeacherSalariesHandler,
    private readonly getOneHandler: GetOneTeacherSalaryHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'O\'qituvchi maoshi yozuvi yaratish' })
  create(@Body() dto: CreateTeacherSalaryRequest) {
    return this.createHandler.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha maosh yozuvlari' })
  getAll(@Query() query: GetAllTeacherSalariesRequest) {
    return this.getAllHandler.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Maosh yozuvi' })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneHandler.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Maosh yozuvini yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTeacherSalaryRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Patch(':id/pay')
  @ApiOperation({ summary: 'Maosh to\'lash' })
  pay(@Param('id', ParseUUIDPipe) id: string, @Body() dto: PayTeacherSalaryRequest) {
    return this.payHandler.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Maosh yozuvini o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteHandler.execute(id);
  }
}
