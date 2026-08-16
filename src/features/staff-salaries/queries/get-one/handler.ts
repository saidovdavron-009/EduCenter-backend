import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';

@Injectable()
export class GetOneStaffSalaryHandler {
  constructor(@InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>) {}

  async execute(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Maosh yozuvi topilmadi');
    return record;
  }
}
