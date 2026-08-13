import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '../../entities/setting.entity';
import { CreateHolidayRequest } from './request';

@Injectable()
export class CreateHolidayHandler {
  constructor(@InjectRepository(Holiday) private readonly holidayRepo: Repository<Holiday>) {}

  async execute(dto: CreateHolidayRequest) {
    const holiday = this.holidayRepo.create(dto);
    return this.holidayRepo.save(holiday);
  }
}