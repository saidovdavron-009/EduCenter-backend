import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '../../entities/setting.entity';
import { GetHolidaysRequest } from './request';

@Injectable()
export class GetHolidaysHandler {
  constructor(@InjectRepository(Holiday) private readonly holidayRepo: Repository<Holiday>) {}

  async execute(query: GetHolidaysRequest) {
    const qb = this.holidayRepo.createQueryBuilder('h');
    if (query.branchId) {
      qb.where('h.branch_id = :branchId OR h.branch_id IS NULL', { branchId: query.branchId });
    }
    qb.orderBy('h.start_date', 'ASC');
    const data = await qb.getMany();
    return { data };
  }
}