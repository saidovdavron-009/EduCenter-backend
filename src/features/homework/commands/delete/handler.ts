import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from '../../entities/homework.entity';

@Injectable()
export class DeleteHomeworkHandler {
  constructor(@InjectRepository(Homework) private readonly repo: Repository<Homework>) {}

  async execute(id: string) {
    const hw = await this.repo.findOne({ where: { id } });
    if (!hw) throw new NotFoundException('Uy vazifasi topilmadi');
    await this.repo.delete(id);
    return { message: 'Uy vazifasi o\'chirildi' };
  }
}