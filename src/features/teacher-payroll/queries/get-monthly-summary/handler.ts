import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { MonthlyPayrollSummary } from '../../entities/monthly-payroll-summary.entity';
import { TeacherPayrollCorrection } from '../../entities/teacher-payroll-correction.entity';
import { TeacherPayrollEntry } from '../../entities/teacher-payroll-entry.entity';
import { LessonSession } from '../../../lesson-sessions/entities/lesson-session.entity';
import { GetMonthlyPayrollSummaryRequest } from './request';

function monthRange(year: number, month: number) {
  const start = new Date(year, month - 1, 1).toISOString().slice(0, 10);
  const end = new Date(year, month, 0).toISOString().slice(0, 10);
  return { start, end };
}

// Qulflangan (isLocked) oy uchun — muzlatilgan summani + tuzatuvlar
// yig'indisini qaytaradi. Hali qulflanmagan oy uchun — TeacherPayrollEntry'lardan
// JONLI (live) hisoblab beradi, hech qanday yozuv yaratmaydi.
@Injectable()
export class GetMonthlyPayrollSummaryHandler {
  constructor(
    @InjectRepository(MonthlyPayrollSummary) private readonly summaryRepo: Repository<MonthlyPayrollSummary>,
    @InjectRepository(TeacherPayrollCorrection) private readonly correctionRepo: Repository<TeacherPayrollCorrection>,
    @InjectRepository(TeacherPayrollEntry) private readonly entryRepo: Repository<TeacherPayrollEntry>,
    @InjectRepository(LessonSession) private readonly lessonSessionRepo: Repository<LessonSession>,
  ) {}

  async execute(query: GetMonthlyPayrollSummaryRequest) {
    const { teacherId, year, month } = query;

    const existing = await this.summaryRepo.findOne({ where: { teacherId, year, month } });
    if (existing) {
      const corrections = await this.correctionRepo.find({ where: { monthlyPayrollSummaryId: existing.id } });
      const correctionsTotal = corrections.reduce((sum, c) => sum + Number(c.amount), 0);
      return {
        teacherId,
        year,
        month,
        totalLessonsPlanned: existing.totalLessonsPlanned,
        totalLessonsConducted: existing.totalLessonsConducted,
        totalAmount: Number(existing.totalAmount),
        isLocked: existing.isLocked,
        correctionsTotal,
        finalAmount: Number(existing.totalAmount) + correctionsTotal,
      };
    }

    const { start, end } = monthRange(year, month);
    const totalLessonsPlanned = await this.lessonSessionRepo.count({
      where: { assignedTeacherId: teacherId, date: Between(start, end) },
    });
    const entries = await this.entryRepo.find({ where: { teacherId, date: Between(start, end) } });
    const totalAmount = entries.reduce((sum, e) => sum + Number(e.amount), 0);

    return {
      teacherId,
      year,
      month,
      totalLessonsPlanned,
      totalLessonsConducted: entries.length,
      totalAmount,
      isLocked: false,
      correctionsTotal: 0,
      finalAmount: totalAmount,
    };
  }
}
