import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../entities/schedule.entity';

@Injectable()
export class GetOneScheduleHandler {
  constructor(@InjectRepository(Schedule) private readonly repo: Repository<Schedule>) {}

  async execute(id: string) {
    const s = await this.repo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Jadval topilmadi');
    return s;
  }
}