import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../entities/schedule.entity';
import { GetWeeklyScheduleRequest } from './request';
import { DayOfWeek } from '../../../../common/types';

@Injectable()
export class GetWeeklyScheduleHandler {
  constructor(@InjectRepository(Schedule) private readonly repo: Repository<Schedule>) {}

  async execute(query: GetWeeklyScheduleRequest) {
    const params: any[] = [];
    let i = 1;

    let sql = `
      SELECT sch.id, sch.group_id as "groupId", g.name as "groupName",
             sub.name as "subjectName", t.full_name as "teacherName",
             sch.day_of_week as "dayOfWeek", sch.start_time as "startTime",
             sch.end_time as "endTime", sch.room,
             COUNT(DISTINCT gs.student_id) FILTER (WHERE gs.status='ACTIVE') as "studentCount"
      FROM schedules sch
      JOIN groups g ON g.id = sch.group_id AND g.status != 'CLOSED'
      LEFT JOIN subjects sub ON sub.id = g.subject_id
      LEFT JOIN teachers t ON t.id = g.teacher_id
      LEFT JOIN group_students gs ON gs.group_id = g.id
      WHERE 1=1
    `;

    if (query.teacherId) { sql += ` AND g.teacher_id = $${i}`; params.push(query.teacherId); i++; }
    if (query.groupId) { sql += ` AND sch.group_id = $${i}`; params.push(query.groupId); i++; }

    sql += ` GROUP BY sch.id, g.name, sub.name, t.full_name ORDER BY sch.start_time`;

    const rows = await this.repo.query(sql, params);

    const weekly: Record<string, any[]> = {
      MON: [], TUE: [], WED: [], THU: [], FRI: [], SAT: [], SUN: [],
    };
    for (const row of rows) {
      if (weekly[row.dayOfWeek]) {
        weekly[row.dayOfWeek].push({ ...row, studentCount: parseInt(row.studentCount) || 0 });
      }
    }
    return weekly;
  }
}