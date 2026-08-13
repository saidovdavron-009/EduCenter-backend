import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework, HomeworkSubmission } from '../../entities/homework.entity';

@Injectable()
export class GetOneHomeworkHandler {
  constructor(
    @InjectRepository(Homework) private readonly hwRepo: Repository<Homework>,
    @InjectRepository(HomeworkSubmission) private readonly submissionRepo: Repository<HomeworkSubmission>,
  ) {}

  async execute(id: string) {
    const hw = await this.hwRepo.findOne({ where: { id } });
    if (!hw) throw new NotFoundException('Uy vazifasi topilmadi');

    const submissions = await this.submissionRepo.query(
      `SELECT hs.id, hs.student_id as "studentId", s.full_name as "studentName", hs.text, hs.file_url as "fileUrl",
              hs.score, hs.feedback, hs.submitted_at as "submittedAt", hs.graded_at as "gradedAt"
       FROM homework_submissions hs JOIN students s ON s.id = hs.student_id
       WHERE hs.homework_id = $1 ORDER BY hs.submitted_at DESC`,
      [id],
    );

    return { ...hw, submissions };
  }
}