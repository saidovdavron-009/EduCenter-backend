import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffSalary } from './entities/staff-salary.entity';
import { User } from '../auth/entities/user.entity';
import { StaffSalariesController } from './staff-salaries.controller';
import { CreateStaffSalaryHandler } from './commands/create/handler';
import { UpdateStaffSalaryHandler } from './commands/update/handler';
import { DeleteStaffSalaryHandler } from './commands/delete/handler';
import { PayStaffSalaryHandler } from './commands/pay/handler';
import { GetAllStaffSalariesHandler } from './queries/get-all/handler';
import { GetOneStaffSalaryHandler } from './queries/get-one/handler';
import { GetStaffSalaryEmployeesHandler } from './queries/get-employees/handler';

@Module({
  imports: [TypeOrmModule.forFeature([StaffSalary, User])],
  controllers: [StaffSalariesController],
  providers: [
    CreateStaffSalaryHandler,
    UpdateStaffSalaryHandler,
    DeleteStaffSalaryHandler,
    PayStaffSalaryHandler,
    GetAllStaffSalariesHandler,
    GetOneStaffSalaryHandler,
    GetStaffSalaryEmployeesHandler,
  ],
  exports: [TypeOrmModule],
})
export class StaffSalariesModule {}
