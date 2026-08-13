import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { SchedulesController } from './schedules.controller';
import { CreateScheduleHandler } from './commands/create/handler';
import { UpdateScheduleHandler } from './commands/update/handler';
import { DeleteScheduleHandler } from './commands/delete/handler';
import { GetOneScheduleHandler } from './queries/get-one/handler';
import { GetAllSchedulesHandler } from './queries/get-all/handler';
import { GetWeeklyScheduleHandler } from './queries/get-weekly/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [SchedulesController],
  providers: [CreateScheduleHandler, UpdateScheduleHandler, DeleteScheduleHandler, GetOneScheduleHandler, GetAllSchedulesHandler, GetWeeklyScheduleHandler],
  exports: [TypeOrmModule],
})
export class SchedulesModule {}