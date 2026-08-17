import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student, GroupStudent } from './entities/student.entity';
import { User } from '../auth/entities/user.entity';
import { StudentsController } from './students.controller';
import { CreateStudentHandler } from './commands/create/handler';
import { UpdateStudentHandler } from './commands/update/handler';
import { DeleteStudentHandler } from './commands/delete/handler';
import { ResetStudentPasswordHandler } from './commands/reset-password/handler';
import { GetOneStudentHandler } from './queries/get-one/handler';
import { GetAllStudentsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Student, GroupStudent, User])],
  controllers: [StudentsController],
  providers: [
    CreateStudentHandler,
    UpdateStudentHandler,
    DeleteStudentHandler,
    ResetStudentPasswordHandler,
    GetOneStudentHandler,
    GetAllStudentsHandler,
  ],
  exports: [TypeOrmModule],
})
export class StudentsModule {}