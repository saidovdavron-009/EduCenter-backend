import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { GetAllStaffSalariesRequest } from './request';

@Injectable()
export class GetAllStaffSalariesHandler {
  constructor(@InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>) {}

  async execute(query: GetAllStaffSalariesRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('ss');
    if (query.employeeId) qb.andWhere('ss.employee_id = :employeeId', { employeeId: query.employeeId });
    if (query.isPaid !== undefined) qb.andWhere('ss.is_paid = :isPaid', { isPaid: query.isPaid });
    qb.orderBy('ss.period_start', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
