import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction } from '../../../../common/types';

@Injectable()
export class DeleteStaffSalaryHandler {
  constructor(
    @InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(id: string, deletedBy: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Maosh yozuvi topilmadi');
    await this.repo.remove(record);

    await this.auditLog.record({
      userId: deletedBy,
      action: AuditAction.DELETE,
      tableName: 'staff_salaries',
      rowId: id,
      oldValues: { employeeId: record.employeeId, totalPaid: record.totalPaid },
    });

    return { message: 'Maosh yozuvi o\'chirildi' };
  }
}
