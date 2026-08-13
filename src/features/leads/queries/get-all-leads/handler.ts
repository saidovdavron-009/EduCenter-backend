import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../entities/lead.entity';
import { GetAllLeadsRequest } from './request';

@Injectable()
export class GetAllLeadsHandler {
  constructor(@InjectRepository(Lead) private readonly leadRepo: Repository<Lead>) {}

  async execute(query: GetAllLeadsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.leadRepo.createQueryBuilder('l');
    if (query.status) qb.andWhere('l.status = :status', { status: query.status });
    if (query.assignedAdminId) qb.andWhere('l.assigned_admin_id = :adminId', { adminId: query.assignedAdminId });
    if (query.branchId) qb.andWhere('l.branch_id = :branchId', { branchId: query.branchId });
    if (query.search) qb.andWhere('(l.full_name ILIKE :s OR l.phone ILIKE :s)', { s: `%${query.search}%` });
    qb.orderBy('l.created_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}