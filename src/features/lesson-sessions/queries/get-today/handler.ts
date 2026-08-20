import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonSession } from '../../entities/lesson-session.entity';
import { LessonSessionStatus } from '../../../../common/types';
import { GetTodayLessonSessionsRequest } from './request';

// "Bugungi darslar" — faqat hozir davom etayotgan yoki allaqachon tugagan
// darslar ko'rsatiladi (hali boshlanmagan darslar ro'yxatga kirmaydi).
@Injectable()
export class GetTodayLessonSessionsHandler {
  constructor(@InjectRepository(LessonSession) private readonly repo: Repository<LessonSession>) {}

  async execute(query: GetTodayLessonSessionsRequest) {
    const date = query.date || new Date().toISOString().slice(0, 10);

    const rows = await this.repo.query(
      `SELECT ls.id, ls.group_id as "groupId", g.name as "groupName", ls.date,
              ls.planned_start_time as "plannedStartTime", ls.planned_end_time as "plannedEndTime",
              ls.assigned_teacher_id as "assignedTeacherId", ta.full_name as "assignedTeacherName",
              ls.actual_teacher_id as "actualTeacherId", tb.full_name as "actualTeacherName",
              ls.status, ls.is_substitution as "isSubstitution"
       FROM lesson_sessions ls
       JOIN groups g ON g.id = ls.group_id
       JOIN teachers ta ON ta.id = ls.assigned_teacher_id
       LEFT JOIN teachers tb ON tb.id = ls.actual_teacher_id
       WHERE ls.date = $1 AND ls.status != $2
       ORDER BY ls.planned_start_time ASC`,
      [date, LessonSessionStatus.CANCELLED],
    );

    const now = new Date();
    const data = rows
      .map((row: any) => {
        const start = new Date(`${date}T${row.plannedStartTime}`);
        const end = new Date(`${date}T${row.plannedEndTime}`);
        return {
          ...row,
          canMarkAttendance: now >= start && now <= end,
          windowState: now <= end ? 'ONGOING' : 'ENDED',
        };
      })
      // Hali boshlanmagan darslar — bu sahifada umuman ko'rsatilmaydi.
      .filter((row: any) => now >= new Date(`${date}T${row.plannedStartTime}`));

    return { date, data };
  }
}
