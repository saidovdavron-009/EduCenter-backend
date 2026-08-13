import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAttendance } from '../../entities/teacher-attendance.entity';
import { GetAllTeacherAttendanceRequest } from './request';

@Injectable()
export class GetAllTeacherAttendanceHandler {
  constructor(@InjectRepository(TeacherAttendance) private readonly repo: Repository<TeacherAttendance>) {}

  async execute(query: GetAllTeacherAttendanceRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 30;
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('ta');
    if (query.teacherId) qb.andWhere('ta.teacher_id = :teacherId', { teacherId: query.teacherId });
    if (query.dateFrom) qb.andWhere('ta.date >= :dateFrom', { dateFrom: query.dateFrom });
    if (query.dateTo) qb.andWhere('ta.date <= :dateTo', { dateTo: query.dateTo });
    qb.orderBy('ta.date', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}