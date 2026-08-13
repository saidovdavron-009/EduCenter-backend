import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../../entities/quiz.entity';
import { GetAllQuizzesRequest } from './request';

@Injectable()
export class GetAllQuizzesHandler {
  constructor(@InjectRepository(Quiz) private readonly quizRepo: Repository<Quiz>) {}

  async execute(query: GetAllQuizzesRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.quizRepo.createQueryBuilder('q');
    if (query.groupId) qb.andWhere('q.group_id = :groupId', { groupId: query.groupId });
    qb.orderBy('q.created_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}