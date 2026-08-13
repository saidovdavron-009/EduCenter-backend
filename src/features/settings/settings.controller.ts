import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { UpsertSettingHandler } from './commands/upsert-setting/handler';
import { CreateHolidayHandler } from './commands/create-holiday/handler';
import { UpdateHolidayHandler } from './commands/update-holiday/handler';
import { DeleteHolidayHandler } from './commands/delete-holiday/handler';
import { GetAllSettingsHandler } from './queries/get-all-settings/handler';
import { GetPublicSettingsHandler } from './queries/get-public-settings/handler';
import { GetHolidaysHandler } from './queries/get-holidays/handler';
import { GetAuditLogsHandler } from './queries/get-audit-logs/handler';
import { GetSmsLogsHandler } from './queries/get-sms-logs/handler';
import { UpsertSettingRequest } from './commands/upsert-setting/request';
import { CreateHolidayRequest } from './commands/create-holiday/request';
import { UpdateHolidayRequest } from './commands/update-holiday/request';
import { GetHolidaysRequest } from './queries/get-holidays/request';
import { GetAuditLogsRequest } from './queries/get-audit-logs/request';
import { GetSmsLogsRequest } from './queries/get-sms-logs/request';

@ApiTags('Settings')
@ApiBearerAuth()
@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class SettingsController {
  constructor(
    private readonly upsertSettingHandler: UpsertSettingHandler,
    private readonly createHolidayHandler: CreateHolidayHandler,
    private readonly updateHolidayHandler: UpdateHolidayHandler,
    private readonly deleteHolidayHandler: DeleteHolidayHandler,
    private readonly getAllSettingsHandler: GetAllSettingsHandler,
    private readonly getPublicSettingsHandler: GetPublicSettingsHandler,
    private readonly getHolidaysHandler: GetHolidaysHandler,
    private readonly getAuditLogsHandler: GetAuditLogsHandler,
    private readonly getSmsLogsHandler: GetSmsLogsHandler,
  ) {}

  @Post('app-settings')
  @ApiOperation({ summary: 'Ilova sozlamasini yaratish/yangilash (upsert)' })
  upsertSetting(@Body() dto: UpsertSettingRequest) { return this.upsertSettingHandler.execute(dto); }

  @Post('holidays')
  @ApiOperation({ summary: 'Bayram/dam olish kunini qo\'shish' })
  createHoliday(@Body() dto: CreateHolidayRequest) { return this.createHolidayHandler.execute(dto); }

  @Patch('holidays/:id')
  @ApiOperation({ summary: 'Bayram/dam olish kunini yangilash' })
  updateHoliday(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateHolidayRequest) {
    return this.updateHolidayHandler.execute(id, dto);
  }

  @Delete('holidays/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bayramni o\'chirish' })
  deleteHoliday(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHolidayHandler.execute(id); }

  @Get('app-settings')
  @ApiOperation({ summary: 'Barcha ilova sozlamalari' })
  getAllSettings() { return this.getAllSettingsHandler.execute(); }

  @Get('public')
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.PARENT)
  @ApiOperation({ summary: 'Barcha rollar uchun ochiq sozlamalar (markaz nomi va h.k.)' })
  getPublicSettings() { return this.getPublicSettingsHandler.execute(); }

  @Get('holidays')
  @ApiOperation({ summary: 'Bayramlar ro\'yxati' })
  getHolidays(@Query() query: GetHolidaysRequest) { return this.getHolidaysHandler.execute(query); }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Audit loglari' })
  getAuditLogs(@Query() query: GetAuditLogsRequest) { return this.getAuditLogsHandler.execute(query); }

  @Get('sms-logs')
  @ApiOperation({ summary: 'SMS loglari' })
  getSmsLogs(@Query() query: GetSmsLogsRequest) { return this.getSmsLogsHandler.execute(query); }
}