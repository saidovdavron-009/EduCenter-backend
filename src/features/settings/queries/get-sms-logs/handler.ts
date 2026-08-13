import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsLog } from '../../entities/setting.entity';
import { GetSmsLogsRequest } from './request';

@Injectable()
export class GetSmsLogsHandler {
  constructor(@InjectRepository(SmsLog) private readonly smsRepo: Repository<SmsLog>) {}

  async execute(query: GetSmsLogsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 30;
    const skip = (page - 1) * limit;

    const qb = this.smsRepo.createQueryBuilder('s');
    if (query.phone) qb.andWhere('s.phone ILIKE :phone', { phone: `%${query.phone}%` });
    if (query.status) qb.andWhere('s.status = :status', { status: query.status });
    qb.orderBy('s.sent_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}