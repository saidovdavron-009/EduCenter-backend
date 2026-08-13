import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from '../../entities/homework.entity';
import { UpdateHomeworkRequest } from './request';

@Injectable()
export class UpdateHomeworkHandler {
  constructor(@InjectRepository(Homework) private readonly repo: Repository<Homework>) {}

  async execute(id: string, dto: UpdateHomeworkRequest) {
    const hw = await this.repo.findOne({ where: { id } });
    if (!hw) throw new NotFoundException('Uy vazifasi topilmadi');
    const data: any = { ...dto };
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }
}