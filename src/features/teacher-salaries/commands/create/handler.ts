import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherSalary } from '../../entities/teacher-salary.entity';
import { CreateTeacherSalaryRequest } from './request';

@Injectable()
export class CreateTeacherSalaryHandler {
  constructor(@InjectRepository(TeacherSalary) private readonly repo: Repository<TeacherSalary>) {}

  async execute(dto: CreateTeacherSalaryRequest) {
    const totalPaid = Number(dto.baseAmount) + Number(dto.bonus || 0) - Number(dto.fine || 0);
    const record = this.repo.create({ ...dto, totalPaid });
    return this.repo.save(record);
  }
}
