import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../../entities/grade.entity';

@Injectable()
export class DeleteGradeHandler {
  constructor(@InjectRepository(Grade) private readonly repo: Repository<Grade>) {}

  async execute(id: string) {
    const grade = await this.repo.findOne({ where: { id } });
    if (!grade) throw new NotFoundException('Baho topilmadi');
    await this.repo.delete(id);
    return { message: 'Baho o\'chirildi' };
  }
}