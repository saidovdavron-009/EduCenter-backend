import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizResult } from '../../entities/quiz.entity';
import { GetQuizResultsRequest } from './request';

@Injectable()
export class GetQuizResultsHandler {
  constructor(@InjectRepository(QuizResult) private readonly resultRepo: Repository<QuizResult>) {}

  async execute(quizId: string, query: GetQuizResultsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.resultRepo.createQueryBuilder('r').where('r.quiz_id = :quizId', { quizId });
    if (query.studentId) qb.andWhere('r.student_id = :studentId', { studentId: query.studentId });
    qb.orderBy('r.score', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}