import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../entities/schedule.entity';
import { CreateScheduleRequest } from './request';

@Injectable()
export class CreateScheduleHandler {
  constructor(@InjectRepository(Schedule) private readonly repo: Repository<Schedule>) {}

  async execute(dto: CreateScheduleRequest) {
    const conflict = await this.repo.query(
      `SELECT id FROM schedules
       WHERE room = $1 AND day_of_week = $2
         AND ((start_time < $3::time AND end_time > $4::time) OR (start_time >= $4::time AND start_time < $3::time))`,
      [dto.room, dto.dayOfWeek, dto.endTime, dto.startTime],
    );
    if (dto.room && conflict.length > 0) {
      throw new ConflictException('Bu xonada ushbu vaqtda boshqa dars mavjud');
    }

    const schedule = this.repo.create(dto);
    return this.repo.save(schedule);
  }
}
