import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffAttendance } from '../../entities/staff-attendance.entity';
import { assertWithinLessonWindow } from '../../../../common/utils/lesson-window.util';
import { WORK_DAY_START, WORK_DAY_END } from '../../../../common/constants/work-hours';
import { LateCorrectionService } from '../../../settings/services/late-correction.service';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction, RequestUser } from '../../../../common/types';
import { CreateStaffAttendanceRequest } from './request';

@Injectable()
export class CreateStaffAttendanceHandler {
  constructor(
    @InjectRepository(StaffAttendance) private readonly repo: Repository<StaffAttendance>,
    private readonly lateCorrection: LateCorrectionService,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(dto: CreateStaffAttendanceRequest, user: RequestUser) {
    const plannedStartTime = dto.plannedStartTime || WORK_DAY_START;
    const plannedEndTime = dto.plannedEndTime || WORK_DAY_END;

    const bypass = await this.lateCorrection.authorize(
      user, dto.lateCorrectionReason, 'staff_attendance', `${dto.userId}:${dto.date}`,
    );
    assertWithinLessonWindow({ startTime: plannedStartTime, endTime: plannedEndTime }, dto.date, { bypass });

    const record = this.repo.create({ ...dto, plannedStartTime, plannedEndTime });
    const saved = await this.repo.save(record);

    await this.auditLog.record({
      userId: user.id,
      action: AuditAction.CREATE,
      tableName: 'staff_attendance',
      rowId: saved.id,
      newValues: { userId: saved.userId, date: saved.date, status: saved.status },
    });

    return saved;
  }
}
