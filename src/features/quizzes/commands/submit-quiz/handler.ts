import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz, QuizQuestion, QuizOption, QuizResult } from '../../entities/quiz.entity';
import { Student } from '../../../students/entities/student.entity';
import { SubmitQuizRequest } from './request';
import { RequestUser } from '../../../../common/types';

@Injectable()
export class SubmitQuizHandler {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepo: Repository<Quiz>,
    @InjectRepository(QuizQuestion) private readonly questionRepo: Repository<QuizQuestion>,
    @InjectRepository(QuizOption) private readonly optionRepo: Repository<QuizOption>,
    @InjectRepository(QuizResult) private readonly resultRepo: Repository<QuizResult>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) {}

  async execute(quizId: string, dto: SubmitQuizRequest, user: RequestUser) {
    const quiz = await this.quizRepo.findOne({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException('Quiz topilmadi');

    const student = await this.studentRepo.findOne({ where: { userId: user.id } });
    if (!student) throw new BadRequestException('Faqat o\'quvchilar quiz topshira oladi');

    const existing = await this.resultRepo.findOne({ where: { quizId, studentId: student.id } });
    if (existing) throw new ConflictException('Siz bu quizni allaqachon topshirgansiz');

    const questions = await this.questionRepo.find({ where: { quizId } });
    const allOptions = await this.optionRepo.createQueryBuilder('o')
      .where('o.question_id IN (:...ids)', { ids: questions.map(q => q.id) })
      .getMany();

    let score = 0;
    let maxScore = 0;

    for (const question of questions) {
      maxScore += Number(question.points);
      const answer = dto.answers.find(a => a.questionId === question.id);
      if (!answer) continue;
      const selectedOption = allOptions.find(o => o.id === answer.selectedOptionId && o.questionId === question.id);
      if (selectedOption?.isCorrect) score += Number(question.points);
    }

    const result = this.resultRepo.create({
      quizId,
      studentId: student.id,
      score,
      maxScore,
      startedAt: new Date(),
      finishedAt: new Date(),
    });
    const saved = await this.resultRepo.save(result);
    return { ...saved, percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0 };
  }
}