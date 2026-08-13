import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../../entities/quiz.entity';

@Injectable()
export class PublishQuizHandler {
  constructor(@InjectRepository(Quiz) private readonly quizRepo: Repository<Quiz>) {}

  async execute(id: string) {
    const quiz = await this.quizRepo.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz topilmadi');
    quiz.isPublished = true;
    await this.quizRepo.save(quiz);
    return { id: quiz.id, isPublished: quiz.isPublished };
  }
}