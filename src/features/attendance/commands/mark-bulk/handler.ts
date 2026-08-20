import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../entities/attendance.entity';
import { Schedule } from '../../../schedules/entities/schedule.entity';
import { assertWithinLessonWindow } from '../../../../common/utils/lesson-window.util';
import { LessonSessionResolverService } from '../../../lesson-sessions/services/lesson-session-resolver.service';
import { LateCorrectionService } from '../../../settings/services/late-correction.service';
import { RequestUser } from '../../../../common/types';
import { MarkBulkAttendanceRequest } from './request';

@Injectable()
export class MarkBulkAttendanceHandler {
  constructor(
    @InjectRepository(Attendance) private readonly repo: Repository<Attendance>,
    @InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>,
    private readonly lessonSessionResolver: LessonSessionResolverService,
    private readonly lateCorrection: LateCorrectionService,
  ) {}

  async execute(dto: MarkBulkAttendanceRequest, user: RequestUser) {
    const schedule = await this.scheduleRepo.findOne({ where: { id: dto.scheduleId } });
    if (!schedule) throw new NotFoundException('Dars jadvali topilmadi');

    const bypass = await this.lateCorrection.authorize(
      user, dto.lateCorrectionReason, 'attendances', `${dto.scheduleId}:${dto.date}`,
    );
    assertWithinLessonWindow(schedule, dto.date, { bypass });

    const lessonSession = await this.lessonSessionResolver.resolveOrCreate(
      schedule.groupId, dto.date, schedule.startTime, schedule.endTime,
    );

    const date = new Date(dto.date) as any;

    for (const item of dto.attendances) {
      const existing = await this.repo.findOne({
        where: { scheduleId: dto.scheduleId, studentId: item.studentId, date },
      });

      if (existing) {
        await this.repo.update(existing.id, {
          status: item.status, note: item.note, markedBy: user.id, lessonSessionId: lessonSession.id,
        });
      } else {
        const a = this.repo.create({
          scheduleId: dto.scheduleId, studentId: item.studentId,
          status: item.status, note: item.note, date, markedBy: user.id,
          lessonSessionId: lessonSession.id,
        });
        await this.repo.save(a);
      }
    }

    return { count: dto.attendances.length, message: `${dto.attendances.length} ta davomat belgilandi` };
  }
}
