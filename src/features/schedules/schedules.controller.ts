
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateScheduleHandler } from './commands/create/handler';
import { UpdateScheduleHandler } from './commands/update/handler';
import { DeleteScheduleHandler } from './commands/delete/handler';
import { GetOneScheduleHandler } from './queries/get-one/handler';
import { GetAllSchedulesHandler } from './queries/get-all/handler';
import { GetWeeklyScheduleHandler } from './queries/get-weekly/handler';
import { CreateScheduleRequest } from './commands/create/request';
import { UpdateScheduleRequest } from './commands/update/request';
import { GetAllSchedulesRequest } from './queries/get-all/request';
import { GetWeeklyScheduleRequest } from './queries/get-weekly/request';

@ApiTags('Schedules')
@ApiBearerAuth()
@Controller('schedules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SchedulesController {
  constructor(
    private readonly createHandler: CreateScheduleHandler,
    private readonly updateHandler: UpdateScheduleHandler,
    private readonly deleteHandler: DeleteScheduleHandler,
    private readonly getOneHandler: GetOneScheduleHandler,
    private readonly getAllHandler: GetAllSchedulesHandler,
    private readonly getWeeklyHandler: GetWeeklyScheduleHandler,
  ) {}

  @Get('weekly')
  @ApiOperation({ summary: 'Haftalik dars jadvali' })
  getWeekly(@Query() query: GetWeeklyScheduleRequest) { return this.getWeeklyHandler.execute(query); }

  @Get()
  @ApiOperation({ summary: 'Barcha jadvallar' })
  getAll(@Query() query: GetAllSchedulesRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @ApiOperation({ summary: 'Jadval ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Jadval yaratish' })
  create(@Body() dto: CreateScheduleRequest) { return this.createHandler.execute(dto); }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Jadval yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateScheduleRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Jadval o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}