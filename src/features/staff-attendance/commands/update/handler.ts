import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffAttendance } from '../../entities/staff-attendance.entity';
import { assertWithinLessonWindow } from '../../../../common/utils/lesson-window.util';
import { WORK_DAY_START, WORK_DAY_END } from '../../../../common/constants/work-hours';
import { LateCorrectionService } from '../../../settings/services/late-correction.service';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction, RequestUser } from '../../../../common/types';
import { UpdateStaffAttendanceRequest } from './request';

@Injectable()
export class UpdateStaffAttendanceHandler {
  constructor(
    @InjectRepository(StaffAttendance) private readonly repo: Repository<StaffAttendance>,
    private readonly lateCorrection: LateCorrectionService,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(id: string, dto: UpdateStaffAttendanceRequest, user: RequestUser) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Yozuv topilmadi');

    const startTime = record.plannedStartTime || WORK_DAY_START;
    const endTime = record.plannedEndTime || WORK_DAY_END;

    const bypass = await this.lateCorrection.authorize(user, dto.lateCorrectionReason, 'staff_attendance', record.id);
    assertWithinLessonWindow({ startTime, endTime }, record.date, { bypass });

    const oldValues = { status: record.status, checkIn: record.checkIn, checkOut: record.checkOut };
    Object.assign(record, dto);
    const saved = await this.repo.save(record);

    await this.auditLog.record({
      userId: user.id,
      action: AuditAction.UPDATE,
      tableName: 'staff_attendance',
      rowId: saved.id,
      oldValues,
      newValues: { status: saved.status, checkIn: saved.checkIn, checkOut: saved.checkOut },
    });

    return saved;
  }
}
