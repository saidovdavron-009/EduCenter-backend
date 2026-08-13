import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherSalary } from '../../entities/teacher-salary.entity';
import { PayTeacherSalaryRequest } from './request';

@Injectable()
export class PayTeacherSalaryHandler {
  constructor(@InjectRepository(TeacherSalary) private readonly repo: Repository<TeacherSalary>) {}

  async execute(id: string, dto: PayTeacherSalaryRequest) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Maosh yozuvi topilmadi');
    if (record.isPaid) throw new BadRequestException('Maosh allaqachon to\'langan');
    record.isPaid = true;
    record.paidAt = new Date();
    if (dto.note) record.note = dto.note;
    return this.repo.save(record);
  }
}
