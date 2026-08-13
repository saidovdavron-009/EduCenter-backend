import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '../../entities/setting.entity';

@Injectable()
export class DeleteHolidayHandler {
  constructor(@InjectRepository(Holiday) private readonly holidayRepo: Repository<Holiday>) {}

  async execute(id: string) {
    const holiday = await this.holidayRepo.findOne({ where: { id } });
    if (!holiday) throw new NotFoundException('Bayram topilmadi');
    await this.holidayRepo.remove(holiday);
    return { message: 'Bayram o\'chirildi' };
  }
}