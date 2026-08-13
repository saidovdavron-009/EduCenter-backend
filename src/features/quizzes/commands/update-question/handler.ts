import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion, QuizOption } from '../../entities/quiz.entity';
import { UpdateQuestionRequest } from './request';

@Injectable()
export class UpdateQuestionHandler {
  constructor(
    @InjectRepository(QuizQuestion) private readonly questionRepo: Repository<QuizQuestion>,
    @InjectRepository(QuizOption) private readonly optionRepo: Repository<QuizOption>,
  ) {}

  async execute(quizId: string, questionId: string, dto: UpdateQuestionRequest) {
    const question = await this.questionRepo.findOne({ where: { id: questionId, quizId } });
    if (!question) throw new NotFoundException('Savol topilmadi');

    const updateData: Record<string, unknown> = {};
    if (dto.questionText !== undefined) updateData.questionText = dto.questionText;
    if (dto.imageUrl !== undefined) updateData.imageUrl = dto.imageUrl;
    if (dto.points !== undefined) updateData.points = dto.points;
    if (dto.sortOrder !== undefined) updateData.sortOrder = dto.sortOrder;
    if (Object.keys(updateData).length > 0) await this.questionRepo.update(questionId, updateData);

    if (dto.options) {
      await this.optionRepo.delete({ questionId });
      const opts = dto.options.map((o) => this.optionRepo.create({ questionId, optionText: o.optionText, isCorrect: o.isCorrect }));
      await this.optionRepo.save(opts);
    }

    const updated = await this.questionRepo.findOne({ where: { id: questionId } });
    const options = await this.optionRepo.find({ where: { questionId } });
    return { ...updated, options };
  }
}
