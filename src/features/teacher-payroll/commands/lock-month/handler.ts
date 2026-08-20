import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { MonthlyPayrollSummary } from '../../entities/monthly-payroll-summary.entity';
import { TeacherPayrollEntry } from '../../entities/teacher-payroll-entry.entity';
import { LessonSession } from '../../../lesson-sessions/entities/lesson-session.entity';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction } from '../../../../common/types';
import { LockMonthlyPayrollRequest } from './request';

// Oyni "muzlatadi" — TeacherPayrollEntry'lar yig'indisidan yakuniy summani
// hisoblab, is_locked=true qilib saqlaydi. Qulflangandan keyin faqad
// [[teacher-payroll-correction]] orqali o'zgartiriladi.
@Injectable()
export class LockMonthlyPayrollHandler {
  constructor(
    @InjectRepository(MonthlyPayrollSummary) private readonly summaryRepo: Repository<MonthlyPayrollSummary>,
    @InjectRepository(TeacherPayrollEntry) private readonly entryRepo: Repository<TeacherPayrollEntry>,
    @InjectRepository(LessonSession) private readonly lessonSessionRepo: Repository<LessonSession>,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(dto: LockMonthlyPayrollRequest, lockedBy: string) {
    const existing = await this.summaryRepo.findOne({
      where: { teacherId: dto.teacherId, year: dto.year, month: dto.month },
    });
    if (existing?.isLocked) {
      throw new BadRequestException("Bu oy uchun hisobot allaqachon qulflangan — faqat tuzatuv orqali o'zgartiring");
    }

    const start = new Date(dto.year, dto.month - 1, 1).toISOString().slice(0, 10);
    const end = new Date(dto.year, dto.month, 0).toISOString().slice(0, 10);

    const totalLessonsPlanned = await this.lessonSessionRepo.count({
      where: { assignedTeacherId: dto.teacherId, date: Between(start, end) },
    });
    const entries = await this.entryRepo.find({ where: { teacherId: dto.teacherId, date: Between(start, end) } });
    const totalAmount = entries.reduce((sum, e) => sum + Number(e.amount), 0);

    const summary = existing || this.summaryRepo.create({ teacherId: dto.teacherId, year: dto.year, month: dto.month });
    summary.totalLessonsPlanned = totalLessonsPlanned;
    summary.totalLessonsConducted = entries.length;
    summary.totalAmount = totalAmount;
    summary.isLocked = true;
    summary.lockedAt = new Date();
    const saved = await this.summaryRepo.save(summary);

    await this.auditLog.record({
      userId: lockedBy,
      action: AuditAction.UPDATE,
      tableName: 'monthly_payroll_summaries',
      rowId: saved.id,
      newValues: { isLocked: true, totalAmount: saved.totalAmount },
    });

    return saved;
  }
}
