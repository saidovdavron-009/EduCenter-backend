import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../entities/attendance.entity';
import { MarkAttendanceRequest } from './request';

@Injectable()
export class MarkAttendanceHandler {
  constructor(@InjectRepository(Attendance) private readonly repo: Repository<Attendance>) {}

  async execute(dto: MarkAttendanceRequest, markedBy: string) {
    const existing = await this.repo.findOne({
      where: { scheduleId: dto.scheduleId, studentId: dto.studentId, date: new Date(dto.date) as any },
    });

    if (existing) {
      await this.repo.update(existing.id, { status: dto.status, note: dto.note, markedBy });
      return this.repo.findOne({ where: { id: existing.id } });
    }

    const attendance = this.repo.create({
      ...dto,
      date: new Date(dto.date) as any,
      markedBy,
    });
    return this.repo.save(attendance);
  }
}