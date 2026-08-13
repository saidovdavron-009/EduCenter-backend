import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSetting, Holiday, SmsLog, AuditLog } from './entities/setting.entity';
import { SettingsController } from './settings.controller';
import { UpsertSettingHandler } from './commands/upsert-setting/handler';
import { CreateHolidayHandler } from './commands/create-holiday/handler';
import { UpdateHolidayHandler } from './commands/update-holiday/handler';
import { DeleteHolidayHandler } from './commands/delete-holiday/handler';
import { GetAllSettingsHandler } from './queries/get-all-settings/handler';
import { GetPublicSettingsHandler } from './queries/get-public-settings/handler';
import { GetHolidaysHandler } from './queries/get-holidays/handler';
import { GetAuditLogsHandler } from './queries/get-audit-logs/handler';
import { GetSmsLogsHandler } from './queries/get-sms-logs/handler';

@Module({
  imports: [TypeOrmModule.forFeature([AppSetting, Holiday, SmsLog, AuditLog])],
  controllers: [SettingsController],
  providers: [
    UpsertSettingHandler, CreateHolidayHandler, UpdateHolidayHandler, DeleteHolidayHandler,
    GetAllSettingsHandler, GetPublicSettingsHandler, GetHolidaysHandler, GetAuditLogsHandler, GetSmsLogsHandler,
  ],
  exports: [TypeOrmModule],
})
export class SettingsModule {}