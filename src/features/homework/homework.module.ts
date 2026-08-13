import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework, HomeworkSubmission } from './entities/homework.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';
import { HomeworkController } from './homework.controller';
import { CreateHomeworkHandler } from './commands/create/handler';
import { UpdateHomeworkHandler } from './commands/update/handler';
import { DeleteHomeworkHandler } from './commands/delete/handler';
import { SubmitHomeworkHandler } from './commands/submit/handler';
import { GradeSubmissionHandler } from './commands/grade-submission/handler';
import { GetAllHomeworkHandler } from './queries/get-all/handler';
import { GetOneHomeworkHandler } from './queries/get-one/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Homework, HomeworkSubmission, Teacher, Student])],
  controllers: [HomeworkController],
  providers: [CreateHomeworkHandler, UpdateHomeworkHandler, DeleteHomeworkHandler, SubmitHomeworkHandler, GradeSubmissionHandler, GetAllHomeworkHandler, GetOneHomeworkHandler],
  exports: [TypeOrmModule],
})
export class HomeworkModule {}