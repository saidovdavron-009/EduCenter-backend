import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion, QuizOption } from '../../entities/quiz.entity';
import { AddQuestionRequest } from './request';

@Injectable()
export class AddQuestionHandler {
  constructor(
    @InjectRepository(QuizQuestion) private readonly questionRepo: Repository<QuizQuestion>,
    @InjectRepository(QuizOption) private readonly optionRepo: Repository<QuizOption>,
  ) {}

  async execute(quizId: string, dto: AddQuestionRequest) {
    const question = this.questionRepo.create({
      quizId,
      questionText: dto.questionText,
      imageUrl: dto.imageUrl,
      points: dto.points ?? 1,
      sortOrder: dto.sortOrder ?? 0,
    });
    const savedQ = await this.questionRepo.save(question);

    let options = [];
    if (dto.options?.length) {
      const opts = dto.options.map(o => this.optionRepo.create({ questionId: savedQ.id, optionText: o.optionText, isCorrect: o.isCorrect }));
      options = await this.optionRepo.save(opts);
    }

    return { ...savedQ, options };
  }
}