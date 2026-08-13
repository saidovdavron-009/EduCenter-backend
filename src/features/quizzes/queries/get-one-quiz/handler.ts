import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz, QuizQuestion, QuizOption } from '../../entities/quiz.entity';

@Injectable()
export class GetOneQuizHandler {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepo: Repository<Quiz>,
    @InjectRepository(QuizQuestion) private readonly questionRepo: Repository<QuizQuestion>,
    @InjectRepository(QuizOption) private readonly optionRepo: Repository<QuizOption>,
  ) {}

  async execute(id: string) {
    const quiz = await this.quizRepo.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz topilmadi');

    const questions = await this.questionRepo.find({ where: { quizId: id }, order: { sortOrder: 'ASC' } });
    const allOptions = questions.length
      ? await this.optionRepo.createQueryBuilder('o').where('o.question_id IN (:...ids)', { ids: questions.map(q => q.id) }).getMany()
      : [];

    const questionsWithOptions = questions.map(q => ({
      ...q,
      options: allOptions.filter(o => o.questionId === q.id),
    }));

    return { ...quiz, questions: questionsWithOptions };
  }
}
