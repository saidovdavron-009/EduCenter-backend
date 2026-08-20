import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { LessonSession } from '../../../lesson-sessions/entities/lesson-session.entity';
import { LessonSessionStatus } from '../../../../common/types';
import { GetTeacherPayrollReportRequest } from './request';

// "Shu oy nechta dars o'tgan, nechta qoldirgan, nechta boshqa guruhda
// almashtirgan" — admin panel hisoboti uchun.
@Injectable()
export class GetTeacherPayrollReportHandler {
  constructor(@InjectRepository(LessonSession) private readonly lessonSessionRepo: Repository<LessonSession>) {}

  async execute(query: GetTeacherPayrollReportRequest) {
    const { teacherId, year, month } = query;
    const start = new Date(year, month - 1, 1).toISOString().slice(0, 10);
    const end = new Date(year, month, 0).toISOString().slice(0, 10);

    const lessonsPlanned = await this.lessonSessionRepo.count({
      where: { assignedTeacherId: teacherId, date: Between(start, end) },
    });

    const lessonsConducted = await this.lessonSessionRepo.count({
      where: {
        assignedTeacherId: teacherId,
        actualTeacherId: teacherId,
        status: LessonSessionStatus.CONDUCTED,
        date: Between(start, end),
      },
    });

    const lessonsSubstitutedElsewhere = await this.lessonSessionRepo.count({
      where: {
        actualTeacherId: teacherId,
        isSubstitution: true,
        status: LessonSessionStatus.CONDUCTED,
        date: Between(start, end),
      },
    });

    return {
      teacherId,
      year,
      month,
      lessonsPlanned,
      lessonsConducted,
      lessonsMissed: lessonsPlanned - lessonsConducted,
      lessonsSubstitutedElsewhere,
    };
  }
}
