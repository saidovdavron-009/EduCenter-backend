import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../entities/contract.entity';
import { GetAllContractsRequest } from './request';

@Injectable()
export class GetAllContractsHandler {
  constructor(@InjectRepository(Contract) private readonly contractRepo: Repository<Contract>) {}

  async execute(query: GetAllContractsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.contractRepo.createQueryBuilder('c');
    if (query.studentId) qb.andWhere('c.student_id = :studentId', { studentId: query.studentId });
    if (query.status) qb.andWhere('c.status = :status', { status: query.status });
    qb.orderBy('c.created_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}