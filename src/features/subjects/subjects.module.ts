import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectsController } from './subjects.controller';
import { CreateSubjectHandler } from './commands/create/handler';
import { UpdateSubjectHandler } from './commands/update/handler';
import { DeleteSubjectHandler } from './commands/delete/handler';
import { GetAllSubjectsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectsController],
  providers: [CreateSubjectHandler, UpdateSubjectHandler, DeleteSubjectHandler, GetAllSubjectsHandler],
  exports: [TypeOrmModule],
})
export class SubjectsModule {}