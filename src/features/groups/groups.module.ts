import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupStudent } from '../students/entities/student.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { GroupsController } from './groups.controller';
import { CreateGroupHandler } from './commands/create/handler';
import { UpdateGroupHandler } from './commands/update/handler';
import { DeleteGroupHandler } from './commands/delete/handler';
import { AddStudentToGroupHandler } from './commands/add-student/handler';
import { RemoveStudentFromGroupHandler } from './commands/remove-student/handler';
import { GetOneGroupHandler } from './queries/get-one/handler';
import { GetAllGroupsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupStudent, Teacher])],
  controllers: [GroupsController],
  providers: [
    CreateGroupHandler, UpdateGroupHandler, DeleteGroupHandler,
    AddStudentToGroupHandler, RemoveStudentFromGroupHandler,
    GetOneGroupHandler, GetAllGroupsHandler,
  ],
  exports: [TypeOrmModule],
})
export class GroupsModule {}
