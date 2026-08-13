import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../entities/schedule.entity';
import { GetAllSchedulesRequest } from './request';

@Injectable()
export class GetAllSchedulesHandler {
  constructor(@InjectRepository(Schedule) private readonly repo: Repository<Schedule>) {}

  async execute(query: GetAllSchedulesRequest) {
    const params: any[] = [];
    let i = 1;

    let sql = `
      SELECT sch.id, sch.group_id as "groupId", g.name as "groupName",
             sub.name as "subjectName", t.full_name as "teacherName",
             sch.day_of_week as "dayOfWeek", sch.start_time as "startTime",
             sch.end_time as "endTime", sch.room
      FROM schedules sch
      JOIN groups g ON g.id = sch.group_id
      LEFT JOIN subjects sub ON sub.id = g.subject_id
      LEFT JOIN teachers t ON t.id = g.teacher_id
      WHERE 1=1
    `;

    if (query.groupId) { sql += ` AND sch.group_id = $${i}`; params.push(query.groupId); i++; }
    if (query.teacherId) { sql += ` AND g.teacher_id = $${i}`; params.push(query.teacherId); i++; }
    if (query.dayOfWeek) { sql += ` AND sch.day_of_week = $${i}`; params.push(query.dayOfWeek); i++; }

    sql += ` ORDER BY sch.day_of_week, sch.start_time`;
    return this.repo.query(sql, params);
  }
}