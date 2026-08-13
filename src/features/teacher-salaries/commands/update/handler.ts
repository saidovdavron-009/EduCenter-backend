import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherSalary } from '../../entities/teacher-salary.entity';
import { UpdateTeacherSalaryRequest } from './request';

@Injectable()
export class UpdateTeacherSalaryHandler {
  constructor(@InjectRepository(TeacherSalary) private readonly repo: Repository<TeacherSalary>) {}

  async execute(id: string, dto: UpdateTeacherSalaryRequest) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Maosh yozuvi topilmadi');
    Object.assign(record, dto);
    const base = Number(record.baseAmount);
    const bonus = Number(record.bonus);
    const fine = Number(record.fine);
    record.totalPaid = base + bonus - fine;
    return this.repo.save(record);
  }
}
