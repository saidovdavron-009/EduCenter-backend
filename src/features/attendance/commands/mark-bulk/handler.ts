import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../entities/attendance.entity';
import { MarkBulkAttendanceRequest } from './request';

@Injectable()
export class MarkBulkAttendanceHandler {
  constructor(@InjectRepository(Attendance) private readonly repo: Repository<Attendance>) {}

  async execute(dto: MarkBulkAttendanceRequest, markedBy: string) {
    const date = new Date(dto.date) as any;

    for (const item of dto.attendances) {
      const existing = await this.repo.findOne({
        where: { scheduleId: dto.scheduleId, studentId: item.studentId, date },
      });

      if (existing) {
        await this.repo.update(existing.id, { status: item.status, note: item.note, markedBy });
      } else {
        const a = this.repo.create({
          scheduleId: dto.scheduleId, studentId: item.studentId,
          status: item.status, note: item.note, date, markedBy,
        });
        await this.repo.save(a);
      }
    }

    return { count: dto.attendances.length, message: `${dto.attendances.length} ta davomat belgilandi` };
  }
}