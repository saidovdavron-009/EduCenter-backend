import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthlyPayrollSummary } from '../../entities/monthly-payroll-summary.entity';
import { TeacherPayrollCorrection } from '../../entities/teacher-payroll-correction.entity';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction } from '../../../../common/types';
import { AddPayrollCorrectionRequest } from './request';

@Injectable()
export class AddPayrollCorrectionHandler {
  constructor(
    @InjectRepository(MonthlyPayrollSummary) private readonly summaryRepo: Repository<MonthlyPayrollSummary>,
    @InjectRepository(TeacherPayrollCorrection) private readonly correctionRepo: Repository<TeacherPayrollCorrection>,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(dto: AddPayrollCorrectionRequest, createdBy: string) {
    const summary = await this.summaryRepo.findOne({ where: { id: dto.monthlyPayrollSummaryId } });
    if (!summary) throw new NotFoundException('Oylik hisobot topilmadi');
    if (!summary.isLocked) throw new BadRequestException("Faqat qulflangan hisobotlarga tuzatuv qo'shish mumkin");

    const correction = this.correctionRepo.create({
      monthlyPayrollSummaryId: summary.id,
      amount: dto.amount,
      reason: dto.reason,
      createdBy,
    });
    const saved = await this.correctionRepo.save(correction);

    await this.auditLog.record({
      userId: createdBy,
      action: AuditAction.UPDATE,
      tableName: 'monthly_payroll_summaries',
      rowId: summary.id,
      newValues: { correctionAmount: dto.amount, reason: dto.reason },
    });

    return saved;
  }
}
