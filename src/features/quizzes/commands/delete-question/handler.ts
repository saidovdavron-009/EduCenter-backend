import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion, QuizOption } from '../../entities/quiz.entity';

@Injectable()
export class DeleteQuestionHandler {
  constructor(
    @InjectRepository(QuizQuestion) private readonly questionRepo: Repository<QuizQuestion>,
    @InjectRepository(QuizOption) private readonly optionRepo: Repository<QuizOption>,
  ) {}

  async execute(quizId: string, questionId: string) {
    const question = await this.questionRepo.findOne({ where: { id: questionId, quizId } });
    if (!question) throw new NotFoundException('Savol topilmadi');
    await this.optionRepo.delete({ questionId });
    await this.questionRepo.delete(questionId);
    return { message: 'Savol o\'chirildi' };
  }
}
