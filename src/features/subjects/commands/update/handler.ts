import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';
import { UpdateSubjectRequest } from './request';

@Injectable()
export class UpdateSubjectHandler {
  constructor(@InjectRepository(Subject) private readonly repo: Repository<Subject>) {}

  async execute(id: string, dto: UpdateSubjectRequest) {
    const subject = await this.repo.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Fan topilmadi');
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }
}