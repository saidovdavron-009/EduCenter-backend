import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonSession } from '../../entities/lesson-session.entity';

@Injectable()
export class GetOneLessonSessionHandler {
  constructor(@InjectRepository(LessonSession) private readonly repo: Repository<LessonSession>) {}

  async execute(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Dars sessiyasi topilmadi');
    return record;
  }
}
