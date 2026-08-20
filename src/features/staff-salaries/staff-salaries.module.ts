import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffSalary } from './entities/staff-salary.entity';
import { StaffSalaryCorrection } from './entities/staff-salary-correction.entity';
import { User } from '../auth/entities/user.entity';
import { StaffAttendance } from '../staff-attendance/entities/staff-attendance.entity';
import { AppSetting } from '../settings/entities/setting.entity';
import { SettingsModule } from '../settings/settings.module';
import { StaffSalariesController } from './staff-salaries.controller';
import { CreateStaffSalaryHandler } from './commands/create/handler';
import { UpdateStaffSalaryHandler } from './commands/update/handler';
import { DeleteStaffSalaryHandler } from './commands/delete/handler';
import { PayStaffSalaryHandler } from './commands/pay/handler';
import { AddStaffSalaryCorrectionHandler } from './commands/add-correction/handler';
import { GetAllStaffSalariesHandler } from './queries/get-all/handler';
import { GetOneStaffSalaryHandler } from './queries/get-one/handler';
import { GetStaffSalaryEmployeesHandler } from './queries/get-employees/handler';
import { GetStaffSalaryCorrectionsHandler } from './queries/get-corrections/handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffSalary, StaffSalaryCorrection, User, StaffAttendance, AppSetting]),
    SettingsModule,
  ],
  controllers: [StaffSalariesController],
  providers: [
    CreateStaffSalaryHandler,
    UpdateStaffSalaryHandler,
    DeleteStaffSalaryHandler,
    PayStaffSalaryHandler,
    AddStaffSalaryCorrectionHandler,
    GetAllStaffSalariesHandler,
    GetOneStaffSalaryHandler,
    GetStaffSalaryEmployeesHandler,
    GetStaffSalaryCorrectionsHandler,
  ],
  exports: [TypeOrmModule],
})
export class StaffSalariesModule {}
