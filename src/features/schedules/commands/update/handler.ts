import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../entities/schedule.entity';
import { UpdateScheduleRequest } from './request';

@Injectable()
export class UpdateScheduleHandler {
  constructor(@InjectRepository(Schedule) private readonly repo: Repository<Schedule>) {}

  async execute(id: string, dto: UpdateScheduleRequest) {
    const schedule = await this.repo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException('Jadval topilmadi');
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }
}