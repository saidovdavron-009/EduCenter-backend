import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonSession } from '../../entities/lesson-session.entity';
import { GetAllLessonSessionsRequest } from './request';

@Injectable()
export class GetAllLessonSessionsHandler {
  constructor(@InjectRepository(LessonSession) private readonly repo: Repository<LessonSession>) {}

  async execute(query: GetAllLessonSessionsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 30;
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('ls');
    if (query.groupId) qb.andWhere('ls.group_id = :groupId', { groupId: query.groupId });
    if (query.teacherId) {
      qb.andWhere('(ls.assigned_teacher_id = :teacherId OR ls.actual_teacher_id = :teacherId)', { teacherId: query.teacherId });
    }
    if (query.dateFrom) qb.andWhere('ls.date >= :dateFrom', { dateFrom: query.dateFrom });
    if (query.dateTo) qb.andWhere('ls.date <= :dateTo', { dateTo: query.dateTo });
    if (query.status) qb.andWhere('ls.status = :status', { status: query.status });
    qb.orderBy('ls.date', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
