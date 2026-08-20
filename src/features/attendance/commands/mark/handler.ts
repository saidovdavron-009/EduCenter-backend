import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../entities/attendance.entity';
import { Schedule } from '../../../schedules/entities/schedule.entity';
import { assertWithinLessonWindow } from '../../../../common/utils/lesson-window.util';
import { LessonSessionResolverService } from '../../../lesson-sessions/services/lesson-session-resolver.service';
import { LateCorrectionService } from '../../../settings/services/late-correction.service';
import { RequestUser } from '../../../../common/types';
import { MarkAttendanceRequest } from './request';

@Injectable()
export class MarkAttendanceHandler {
  constructor(
    @InjectRepository(Attendance) private readonly repo: Repository<Attendance>,
    @InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>,
    private readonly lessonSessionResolver: LessonSessionResolverService,
    private readonly lateCorrection: LateCorrectionService,
  ) {}

  async execute(dto: MarkAttendanceRequest, user: RequestUser) {
    const schedule = await this.scheduleRepo.findOne({ where: { id: dto.scheduleId } });
    if (!schedule) throw new NotFoundException('Dars jadvali topilmadi');

    const bypass = await this.lateCorrection.authorize(
      user, dto.lateCorrectionReason, 'attendances', `${dto.scheduleId}:${dto.studentId}:${dto.date}`,
    );
    assertWithinLessonWindow(schedule, dto.date, { bypass });

    const lessonSession = await this.lessonSessionResolver.resolveOrCreate(
      schedule.groupId, dto.date, schedule.startTime, schedule.endTime,
    );

    const existing = await this.repo.findOne({
      where: { scheduleId: dto.scheduleId, studentId: dto.studentId, date: new Date(dto.date) as any },
    });

    if (existing) {
      await this.repo.update(existing.id, {
        status: dto.status, note: dto.note, markedBy: user.id, lessonSessionId: lessonSession.id,
      });
      return this.repo.findOne({ where: { id: existing.id } });
    }

    const attendance = this.repo.create({
      scheduleId: dto.scheduleId,
      studentId: dto.studentId,
      status: dto.status,
      note: dto.note,
      date: new Date(dto.date) as any,
      markedBy: user.id,
      lessonSessionId: lessonSession.id,
    });
    return this.repo.save(attendance);
  }
}
