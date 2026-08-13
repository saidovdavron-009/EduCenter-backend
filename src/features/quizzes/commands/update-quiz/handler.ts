import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../../entities/quiz.entity';
import { UpdateQuizRequest } from './request';

@Injectable()
export class UpdateQuizHandler {
  constructor(@InjectRepository(Quiz) private readonly quizRepo: Repository<Quiz>) {}

  async execute(id: string, dto: UpdateQuizRequest) {
    const quiz = await this.quizRepo.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz topilmadi');
    Object.assign(quiz, dto);
    return this.quizRepo.save(quiz);
  }
}