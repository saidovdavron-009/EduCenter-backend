import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffAttendance } from '../../entities/staff-attendance.entity';
import { GetAllStaffAttendanceRequest } from './request';

@Injectable()
export class GetAllStaffAttendanceHandler {
  constructor(@InjectRepository(StaffAttendance) private readonly repo: Repository<StaffAttendance>) {}

  async execute(query: GetAllStaffAttendanceRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 30;
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('sa');
    if (query.userId) qb.andWhere('sa.user_id = :userId', { userId: query.userId });
    if (query.dateFrom) qb.andWhere('sa.date >= :dateFrom', { dateFrom: query.dateFrom });
    if (query.dateTo) qb.andWhere('sa.date <= :dateTo', { dateTo: query.dateTo });
    qb.orderBy('sa.date', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
