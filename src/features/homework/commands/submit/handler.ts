import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework, HomeworkSubmission } from '../../entities/homework.entity';
import { Student } from '../../../students/entities/student.entity';
import { SubmitHomeworkRequest } from './request';

@Injectable()
export class SubmitHomeworkHandler {
  constructor(
    @InjectRepository(Homework) private readonly hwRepo: Repository<Homework>,
    @InjectRepository(HomeworkSubmission) private readonly submissionRepo: Repository<HomeworkSubmission>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) {}

  async execute(dto: SubmitHomeworkRequest, userId: string) {
    const hw = await this.hwRepo.findOne({ where: { id: dto.homeworkId } });
    if (!hw) throw new NotFoundException('Uy vazifasi topilmadi');

    const student = await this.studentRepo.findOne({ where: { userId } });
    if (!student) throw new BadRequestException('O\'quvchi topilmadi');
    const studentId = student.id;

    const existing = await this.submissionRepo.findOne({ where: { homeworkId: dto.homeworkId, studentId } });
    if (existing) {
      await this.submissionRepo.update(existing.id, { text: dto.text, fileUrl: dto.fileUrl, submittedAt: new Date() });
      return this.submissionRepo.findOne({ where: { id: existing.id } });
    }

    const submission = this.submissionRepo.create({ homeworkId: dto.homeworkId, studentId, text: dto.text, fileUrl: dto.fileUrl });
    return this.submissionRepo.save(submission);
  }
}