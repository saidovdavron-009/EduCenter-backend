import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentParent } from '../../entities/parent.entity';
import { LinkStudentRequest } from './request';

@Injectable()
export class LinkStudentHandler {
  constructor(@InjectRepository(StudentParent) private readonly spRepo: Repository<StudentParent>) {}

  async execute(dto: LinkStudentRequest) {
    const existing = await this.spRepo.findOne({ where: { studentId: dto.studentId, parentId: dto.parentId } });
    if (existing) throw new ConflictException('Bu bog\'liqlik allaqachon mavjud');
    const link = this.spRepo.create(dto);
    return this.spRepo.save(link);
  }
}