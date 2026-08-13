import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { CreateTaskHandler } from './commands/create/handler';
import { UpdateTaskHandler } from './commands/update/handler';
import { DeleteTaskHandler } from './commands/delete/handler';
import { GetOneTaskHandler } from './queries/get-one/handler';
import { GetAllTasksHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [CreateTaskHandler, UpdateTaskHandler, DeleteTaskHandler, GetOneTaskHandler, GetAllTasksHandler],
  exports: [TypeOrmModule],
})
export class TasksModule {}