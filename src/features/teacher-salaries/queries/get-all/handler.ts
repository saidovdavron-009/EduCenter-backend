import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherSalary } from '../../entities/teacher-salary.entity';
import { GetAllTeacherSalariesRequest } from './request';

@Injectable()
export class GetAllTeacherSalariesHandler {
  constructor(@InjectRepository(TeacherSalary) private readonly repo: Repository<TeacherSalary>) {}

  async execute(query: GetAllTeacherSalariesRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('ts');
    if (query.teacherId) qb.andWhere('ts.teacher_id = :teacherId', { teacherId: query.teacherId });
    if (query.isPaid !== undefined) qb.andWhere('ts.is_paid = :isPaid', { isPaid: query.isPaid });
    qb.orderBy('ts.period_start', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
