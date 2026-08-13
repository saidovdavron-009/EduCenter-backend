import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../../entities/discount.entity';
import { GetAllDiscountsRequest } from './request';

@Injectable()
export class GetAllDiscountsHandler {
  constructor(@InjectRepository(Discount) private readonly repo: Repository<Discount>) {}

  async execute(query: GetAllDiscountsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('d');
    if (query.studentId) qb.andWhere('d.student_id = :studentId', { studentId: query.studentId });
    if (query.groupId) qb.andWhere('d.group_id = :groupId', { groupId: query.groupId });
    if (query.isActive !== undefined) qb.andWhere('d.is_active = :isActive', { isActive: query.isActive });
    qb.orderBy('d.created_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
