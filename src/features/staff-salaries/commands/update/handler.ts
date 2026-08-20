import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction } from '../../../../common/types';
import { UpdateStaffSalaryRequest } from './request';

@Injectable()
export class UpdateStaffSalaryHandler {
  constructor(
    @InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(id: string, dto: UpdateStaffSalaryRequest, updatedBy: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Maosh yozuvi topilmadi');
    if (record.isPaid) {
      throw new BadRequestException("To'langan yozuv o'zgartirilmaydi — tuzatuv (correction) qo'shing");
    }

    const oldValues = { baseAmount: record.baseAmount, bonus: record.bonus, fine: record.fine };
    Object.assign(record, dto);
    const base = Number(record.baseAmount);
    const bonus = Number(record.bonus);
    const fine = Number(record.fine);
    record.totalPaid = base + bonus - fine;
    const saved = await this.repo.save(record);

    await this.auditLog.record({
      userId: updatedBy,
      action: AuditAction.UPDATE,
      tableName: 'staff_salaries',
      rowId: saved.id,
      oldValues,
      newValues: { baseAmount: saved.baseAmount, bonus: saved.bonus, fine: saved.fine, totalPaid: saved.totalPaid },
    });

    return saved;
  }
}
