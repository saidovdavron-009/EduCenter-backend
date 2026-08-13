import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';

@Injectable()
export class DeleteSubjectHandler {
  constructor(@InjectRepository(Subject) private readonly repo: Repository<Subject>) {}

  async execute(id: string) {
    const subject = await this.repo.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Fan topilmadi');
    await this.repo.update(id, { isActive: false });
    return { message: 'Fan muvaffaqiyatli o\'chirildi' };
  }
}