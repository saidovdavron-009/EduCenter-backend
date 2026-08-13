import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../entities/setting.entity';
import { GetAuditLogsRequest } from './request';

@Injectable()
export class GetAuditLogsHandler {
  constructor(@InjectRepository(AuditLog) private readonly auditRepo: Repository<AuditLog>) {}

  async execute(query: GetAuditLogsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 50;
    const skip = (page - 1) * limit;

    const qb = this.auditRepo.createQueryBuilder('a');
    if (query.userId) qb.andWhere('a.user_id = :userId', { userId: query.userId });
    if (query.action) qb.andWhere('a.action = :action', { action: query.action });
    if (query.tableName) qb.andWhere('a.table_name = :tableName', { tableName: query.tableName });
    qb.orderBy('a.created_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}