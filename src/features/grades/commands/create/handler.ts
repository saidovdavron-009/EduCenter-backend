import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../../entities/grade.entity';
import { Teacher } from '../../../teachers/entities/teacher.entity';
import { CreateGradeRequest } from './request';

@Injectable()
export class CreateGradeHandler {
  constructor(
    @InjectRepository(Grade) private readonly repo: Repository<Grade>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async execute(dto: CreateGradeRequest, userId: string) {
    let teacherId = dto.teacherId;
    if (!teacherId) {
      const teacher = await this.teacherRepo.findOne({ where: { userId } });
      if (!teacher) throw new BadRequestException('teacherId ko\'rsatilishi shart');
      teacherId = teacher.id;
    }

    const grade = this.repo.create({ ...dto, teacherId, date: new Date(dto.date) as any, maxScore: dto.maxScore || 100 });
    return this.repo.save(grade);
  }
}