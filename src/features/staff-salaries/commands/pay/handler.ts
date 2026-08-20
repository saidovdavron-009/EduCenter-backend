import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction } from '../../../../common/types';
import { PayStaffSalaryRequest } from './request';

@Injectable()
export class PayStaffSalaryHandler {
  constructor(
    @InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(id: string, dto: PayStaffSalaryRequest, paidBy: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Maosh yozuvi topilmadi');
    if (record.isPaid) throw new BadRequestException('Maosh allaqachon to\'langan');
    record.isPaid = true;
    record.paidAt = new Date();
    if (dto.note) record.note = dto.note;
    const saved = await this.repo.save(record);

    await this.auditLog.record({
      userId: paidBy,
      action: AuditAction.UPDATE,
      tableName: 'staff_salaries',
      rowId: saved.id,
      newValues: { isPaid: true, paidAt: saved.paidAt, totalPaid: saved.totalPaid },
    });

    return saved;
  }
}
