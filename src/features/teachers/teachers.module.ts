import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { User } from '../auth/entities/user.entity';
import { TeachersController } from './teachers.controller';
import { CreateTeacherHandler } from './commands/create/handler';
import { UpdateTeacherHandler } from './commands/update/handler';
import { DeleteTeacherHandler } from './commands/delete/handler';
import { GetOneTeacherHandler } from './queries/get-one/handler';
import { GetAllTeachersHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, User])],
  controllers: [TeachersController],
  providers: [CreateTeacherHandler, UpdateTeacherHandler, DeleteTeacherHandler, GetOneTeacherHandler, GetAllTeachersHandler],
  exports: [TypeOrmModule],
})
export class TeachersModule {}