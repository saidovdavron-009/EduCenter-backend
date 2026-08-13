import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from '../../entities/parent.entity';

@Injectable()
export class DeleteParentHandler {
  constructor(@InjectRepository(Parent) private readonly parentRepo: Repository<Parent>) {}

  async execute(id: string) {
    const parent = await this.parentRepo.findOne({ where: { id } });
    if (!parent) throw new NotFoundException('Ota-ona topilmadi');
    await this.parentRepo.remove(parent);
    return { message: 'Ota-ona muvaffaqiyatli o\'chirildi' };
  }
}