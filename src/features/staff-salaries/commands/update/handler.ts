import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { UpdateStaffSalaryRequest } from './request';

@Injectable()
export class UpdateStaffSalaryHandler {
  constructor(@InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>) {}

  async execute(id: string, dto: UpdateStaffSalaryRequest) {
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
