import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';
import { CreateSubjectRequest } from './request';

@Injectable()
export class CreateSubjectHandler {
  constructor(@InjectRepository(Subject) private readonly repo: Repository<Subject>) {}

  async execute(dto: CreateSubjectRequest) {
    const exists = await this.repo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException(`"${dto.name}" fani allaqachon mavjud`);

    const subject = this.repo.create(dto);
    return this.repo.save(subject);
  }
}