import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalaryCorrection } from '../../entities/staff-salary-correction.entity';

@Injectable()
export class GetStaffSalaryCorrectionsHandler {
  constructor(@InjectRepository(StaffSalaryCorrection) private readonly repo: Repository<StaffSalaryCorrection>) {}

  async execute(staffSalaryId: string) {
    const data = await this.repo.find({ where: { staffSalaryId }, order: { createdAt: 'DESC' } });
    const correctionsTotal = data.reduce((sum, c) => sum + Number(c.amount), 0);
    return { data, correctionsTotal };
  }
}
