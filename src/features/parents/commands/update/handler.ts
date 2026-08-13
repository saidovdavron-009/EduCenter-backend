import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from '../../entities/parent.entity';
import { UpdateParentRequest } from './request';

@Injectable()
export class UpdateParentHandler {
  constructor(@InjectRepository(Parent) private readonly parentRepo: Repository<Parent>) {}

  async execute(id: string, dto: UpdateParentRequest) {
    const parent = await this.parentRepo.findOne({ where: { id } });
    if (!parent) throw new NotFoundException('Ota-ona topilmadi');
    Object.assign(parent, dto);
    return this.parentRepo.save(parent);
  }
}