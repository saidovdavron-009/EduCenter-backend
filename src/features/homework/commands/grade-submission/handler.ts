import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeworkSubmission } from '../../entities/homework.entity';
import { GradeSubmissionRequest } from './request';

@Injectable()
export class GradeSubmissionHandler {
  constructor(@InjectRepository(HomeworkSubmission) private readonly repo: Repository<HomeworkSubmission>) {}

  async execute(dto: GradeSubmissionRequest) {
    const submission = await this.repo.findOne({ where: { id: dto.submissionId } });
    if (!submission) throw new NotFoundException('Topshiriq topilmadi');
    await this.repo.update(dto.submissionId, { score: dto.score, feedback: dto.feedback, gradedAt: new Date() });
    return this.repo.findOne({ where: { id: dto.submissionId } });
  }
}