import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '../../entities/setting.entity';
import { UpdateHolidayRequest } from './request';

@Injectable()
export class UpdateHolidayHandler {
  constructor(@InjectRepository(Holiday) private readonly holidayRepo: Repository<Holiday>) {}

  async execute(id: string, dto: UpdateHolidayRequest) {
    const holiday = await this.holidayRepo.findOne({ where: { id } });
    if (!holiday) throw new NotFoundException('Bayram/tatil topilmadi');
    await this.holidayRepo.update(id, dto);
    return this.holidayRepo.findOne({ where: { id } });
  }
}
