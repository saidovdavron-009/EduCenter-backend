import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../entities/attendance.entity';
import { GetAllAttendanceRequest } from './request';

@Injectable()
export class GetAllAttendanceHandler {
  constructor(@InjectRepository(Attendance) private readonly repo: Repository<Attendance>) {}

  async execute(query: GetAllAttendanceRequest) {
    const { page = 1, limit = 50, scheduleId, studentId, groupId, dateFrom, dateTo, status } = query;
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let i = 1;

    let sql = `
      SELECT a.id, s.full_name as "studentName", g.name as "groupName",
             a.status, a.date, a.note, a.schedule_id as "scheduleId",
             a.student_id as "studentId", a.created_at as "createdAt"
      FROM attendances a
      JOIN students s ON s.id = a.student_id
      JOIN schedules sch ON sch.id = a.schedule_id
      JOIN groups g ON g.id = sch.group_id
      WHERE 1=1
    `;

    if (scheduleId) { sql += ` AND a.schedule_id = $${i}`; params.push(scheduleId); i++; }
    if (studentId) { sql += ` AND a.student_id = $${i}`; params.push(studentId); i++; }
    if (groupId) { sql += ` AND sch.group_id = $${i}`; params.push(groupId); i++; }
    if (dateFrom) { sql += ` AND a.date >= $${i}`; params.push(dateFrom); i++; }
    if (dateTo) { sql += ` AND a.date <= $${i}`; params.push(dateTo); i++; }
    if (status) { sql += ` AND a.status = $${i}`; params.push(status); i++; }

    const countSql = `SELECT COUNT(*) FROM (${sql}) as sub`;
    const dataSql = sql + ` ORDER BY a.date DESC LIMIT $${i} OFFSET $${i + 1}`;
    params.push(limit, offset);

    const [countResult, data] = await Promise.all([
      this.repo.query(countSql, params.slice(0, -2)),
      this.repo.query(dataSql, params),
    ]);

    const total = parseInt(countResult[0]?.count || '0');
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}