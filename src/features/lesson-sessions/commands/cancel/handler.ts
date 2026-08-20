import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonSession } from '../../entities/lesson-session.entity';
import { TeacherPayrollEntry } from '../../../teacher-payroll/entities/teacher-payroll-entry.entity';
import { LessonSessionStatus } from '../../../../common/types';

@Injectable()
export class CancelLessonSessionHandler {
  constructor(
    @InjectRepository(LessonSession) private readonly repo: Repository<LessonSession>,
    @InjectRepository(TeacherPayrollEntry) private readonly payrollRepo: Repository<TeacherPayrollEntry>,
  ) {}

  async execute(id: string) {
    const session = await this.repo.findOne({ where: { id } });
    if (!session) throw new NotFoundException('Dars sessiyasi topilmadi');

    await this.payrollRepo.delete({ lessonSessionId: session.id });

    session.status = LessonSessionStatus.CANCELLED;
    session.actualTeacherId = null;
    session.isSubstitution = false;
    return this.repo.save(session);
  }
}
