import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { GradesController } from './grades.controller';
import { CreateGradeHandler } from './commands/create/handler';
import { UpdateGradeHandler } from './commands/update/handler';
import { DeleteGradeHandler } from './commands/delete/handler';
import { GetAllGradesHandler } from './queries/get-all/handler';
import { GetGradesByGroupHandler } from './queries/get-by-group/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Teacher])],
  controllers: [GradesController],
  providers: [CreateGradeHandler, UpdateGradeHandler, DeleteGradeHandler, GetAllGradesHandler, GetGradesByGroupHandler],
  exports: [TypeOrmModule],
})
export class GradesModule {}