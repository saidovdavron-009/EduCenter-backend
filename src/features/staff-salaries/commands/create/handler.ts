import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { CreateStaffSalaryRequest } from './request';

@Injectable()
export class CreateStaffSalaryHandler {
  constructor(@InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>) {}

  async execute(dto: CreateStaffSalaryRequest) {
    const totalPaid = Number(dto.baseAmount) + Number(dto.bonus || 0) - Number(dto.fine || 0);
    const record = this.repo.create({ ...dto, totalPaid });
    return this.repo.save(record);
  }
}
