import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { PayStaffSalaryRequest } from './request';

@Injectable()
export class PayStaffSalaryHandler {
  constructor(@InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>) {}

  async execute(id: string, dto: PayStaffSalaryRequest) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Maosh yozuvi topilmadi');
    if (record.isPaid) throw new BadRequestException('Maosh allaqachon to\'langan');
    record.isPaid = true;
    record.paidAt = new Date();
    if (dto.note) record.note = dto.note;
    return this.repo.save(record);
  }
}
