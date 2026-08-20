import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherPayrollEntry } from '../../entities/teacher-payroll-entry.entity';
import { GetTeacherPayrollEntriesRequest } from './request';

@Injectable()
export class GetTeacherPayrollEntriesHandler {
  constructor(@InjectRepository(TeacherPayrollEntry) private readonly repo: Repository<TeacherPayrollEntry>) {}

  async execute(query: GetTeacherPayrollEntriesRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 30;
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('pe');
    if (query.teacherId) qb.andWhere('pe.teacher_id = :teacherId', { teacherId: query.teacherId });
    if (query.groupId) qb.andWhere('pe.group_id = :groupId', { groupId: query.groupId });
    if (query.dateFrom) qb.andWhere('pe.date >= :dateFrom', { dateFrom: query.dateFrom });
    if (query.dateTo) qb.andWhere('pe.date <= :dateTo', { dateTo: query.dateTo });
    qb.orderBy('pe.date', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
