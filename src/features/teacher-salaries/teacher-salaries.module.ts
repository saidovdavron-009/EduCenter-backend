import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherSalary } from './entities/teacher-salary.entity';
import { TeacherSalariesController } from './teacher-salaries.controller';
import { CreateTeacherSalaryHandler } from './commands/create/handler';
import { UpdateTeacherSalaryHandler } from './commands/update/handler';
import { DeleteTeacherSalaryHandler } from './commands/delete/handler';
import { PayTeacherSalaryHandler } from './commands/pay/handler';
import { GetAllTeacherSalariesHandler } from './queries/get-all/handler';
import { GetOneTeacherSalaryHandler } from './queries/get-one/handler';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherSalary])],
  controllers: [TeacherSalariesController],
  providers: [
    CreateTeacherSalaryHandler,
    UpdateTeacherSalaryHandler,
    DeleteTeacherSalaryHandler,
    PayTeacherSalaryHandler,
    GetAllTeacherSalariesHandler,
    GetOneTeacherSalaryHandler,
  ],
  exports: [TypeOrmModule],
})
export class TeacherSalariesModule {}
