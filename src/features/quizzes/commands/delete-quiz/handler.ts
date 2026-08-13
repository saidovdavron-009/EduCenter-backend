import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Quiz, QuizQuestion, QuizOption, QuizResult } from '../../entities/quiz.entity';

@Injectable()
export class DeleteQuizHandler {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepo: Repository<Quiz>,
    @InjectRepository(QuizQuestion) private readonly questionRepo: Repository<QuizQuestion>,
    @InjectRepository(QuizOption) private readonly optionRepo: Repository<QuizOption>,
    @InjectRepository(QuizResult) private readonly resultRepo: Repository<QuizResult>,
  ) {}

  async execute(id: string) {
    const quiz = await this.quizRepo.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz topilmadi');

    const questions = await this.questionRepo.find({ where: { quizId: id } });
    if (questions.length > 0) {
      await this.optionRepo.delete({ questionId: In(questions.map((q) => q.id)) });
      await this.questionRepo.delete({ quizId: id });
    }
    await this.resultRepo.delete({ quizId: id });
    await this.quizRepo.remove(quiz);
    return { message: 'Quiz o\'chirildi' };
  }
}