import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../../entities/grade.entity';
import { UpdateGradeRequest } from './request';

@Injectable()
export class UpdateGradeHandler {
  constructor(@InjectRepository(Grade) private readonly repo: Repository<Grade>) {}

  async execute(id: string, dto: UpdateGradeRequest) {
    const grade = await this.repo.findOne({ where: { id } });
    if (!grade) throw new NotFoundException('Baho topilmadi');
    const updateData: any = { ...dto };
    if (dto.date) updateData.date = new Date(dto.date);
    await this.repo.update(id, updateData);
    return this.repo.findOne({ where: { id } });
  }
}