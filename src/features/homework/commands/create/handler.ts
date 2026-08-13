import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from '../../entities/homework.entity';
import { Teacher } from '../../../teachers/entities/teacher.entity';
import { CreateHomeworkRequest } from './request';

@Injectable()
export class CreateHomeworkHandler {
  constructor(
    @InjectRepository(Homework) private readonly repo: Repository<Homework>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async execute(dto: CreateHomeworkRequest, userId: string) {
    let teacherId = dto.teacherId;
    if (!teacherId) {
      const teacher = await this.teacherRepo.findOne({ where: { userId } });
      if (!teacher) throw new BadRequestException('teacherId ko\'rsatilishi shart');
      teacherId = teacher.id;
    }

    const hw = this.repo.create({ ...dto, teacherId, dueDate: new Date(dto.dueDate) as any, maxScore: dto.maxScore || 100 });
    return this.repo.save(hw);
  }
}