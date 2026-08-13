import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../../entities/quiz.entity';
import { CreateQuizRequest } from './request';

@Injectable()
export class CreateQuizHandler {
  constructor(@InjectRepository(Quiz) private readonly quizRepo: Repository<Quiz>) {}

  async execute(dto: CreateQuizRequest) {
    const quiz = this.quizRepo.create(dto);
    return this.quizRepo.save(quiz);
  }
}