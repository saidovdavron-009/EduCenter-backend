import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { StaffSalaryCorrection } from '../../entities/staff-salary-correction.entity';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction } from '../../../../common/types';
import { AddStaffSalaryCorrectionRequest } from './request';

@Injectable()
export class AddStaffSalaryCorrectionHandler {
  constructor(
    @InjectRepository(StaffSalary) private readonly salaryRepo: Repository<StaffSalary>,
    @InjectRepository(StaffSalaryCorrection) private readonly correctionRepo: Repository<StaffSalaryCorrection>,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(dto: AddStaffSalaryCorrectionRequest, createdBy: string) {
    const salary = await this.salaryRepo.findOne({ where: { id: dto.staffSalaryId } });
    if (!salary) throw new NotFoundException('Maosh yozuvi topilmadi');
    if (!salary.isPaid) throw new BadRequestException("Faqat to'langan yozuvlarga tuzatuv qo'shish mumkin");

    const correction = this.correctionRepo.create({
      staffSalaryId: salary.id,
      amount: dto.amount,
      reason: dto.reason,
      createdBy,
    });
    const saved = await this.correctionRepo.save(correction);

    await this.auditLog.record({
      userId: createdBy,
      action: AuditAction.UPDATE,
      tableName: 'staff_salaries',
      rowId: salary.id,
      newValues: { correctionAmount: dto.amount, reason: dto.reason },
    });

    return saved;
  }
}
