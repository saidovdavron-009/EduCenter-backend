import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherAttendance } from './entities/teacher-attendance.entity';
import { TeacherAttendanceController } from './teacher-attendance.controller';
import { CreateTeacherAttendanceHandler } from './commands/create/handler';
import { UpdateTeacherAttendanceHandler } from './commands/update/handler';
import { DeleteTeacherAttendanceHandler } from './commands/delete/handler';
import { GetAllTeacherAttendanceHandler } from './queries/get-all/handler';
import { GetOneTeacherAttendanceHandler } from './queries/get-one/handler';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherAttendance])],
  controllers: [TeacherAttendanceController],
  providers: [
    CreateTeacherAttendanceHandler,
    UpdateTeacherAttendanceHandler,
    DeleteTeacherAttendanceHandler,
    GetAllTeacherAttendanceHandler,
    GetOneTeacherAttendanceHandler,
  ],
  exports: [TypeOrmModule],
})
export class TeacherAttendanceModule {}
