import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentParent } from '../../entities/parent.entity';
import { UnlinkStudentRequest } from './request';

@Injectable()
export class UnlinkStudentHandler {
  constructor(@InjectRepository(StudentParent) private readonly spRepo: Repository<StudentParent>) {}

  async execute(dto: UnlinkStudentRequest) {
    const link = await this.spRepo.findOne({ where: { studentId: dto.studentId, parentId: dto.parentId } });
    if (!link) throw new NotFoundException('Bog\'liqlik topilmadi');
    await this.spRepo.remove(link);
    return { message: 'Bog\'liqlik o\'chirildi' };
  }
}