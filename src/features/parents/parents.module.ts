import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent, StudentParent } from './entities/parent.entity';
import { User } from '../auth/entities/user.entity';
import { ParentsController } from './parents.controller';
import { CreateParentHandler } from './commands/create/handler';
import { UpdateParentHandler } from './commands/update/handler';
import { DeleteParentHandler } from './commands/delete/handler';
import { LinkStudentHandler } from './commands/link-student/handler';
import { UnlinkStudentHandler } from './commands/unlink-student/handler';
import { GetOneParentHandler } from './queries/get-one/handler';
import { GetAllParentsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, StudentParent, User])],
  controllers: [ParentsController],
  providers: [CreateParentHandler, UpdateParentHandler, DeleteParentHandler, LinkStudentHandler, UnlinkStudentHandler, GetOneParentHandler, GetAllParentsHandler],
  exports: [TypeOrmModule],
})
export class ParentsModule {}