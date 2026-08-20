import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffAttendance } from './entities/staff-attendance.entity';
import { SettingsModule } from '../settings/settings.module';
import { StaffAttendanceController } from './staff-attendance.controller';
import { CreateStaffAttendanceHandler } from './commands/create/handler';
import { UpdateStaffAttendanceHandler } from './commands/update/handler';
import { DeleteStaffAttendanceHandler } from './commands/delete/handler';
import { GetAllStaffAttendanceHandler } from './queries/get-all/handler';
import { GetOneStaffAttendanceHandler } from './queries/get-one/handler';

@Module({
  imports: [TypeOrmModule.forFeature([StaffAttendance]), SettingsModule],
  controllers: [StaffAttendanceController],
  providers: [
    CreateStaffAttendanceHandler,
    UpdateStaffAttendanceHandler,
    DeleteStaffAttendanceHandler,
    GetAllStaffAttendanceHandler,
    GetOneStaffAttendanceHandler,
  ],
  exports: [TypeOrmModule],
})
export class StaffAttendanceModule {}
