import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../entities/attendance.entity';
import { GetMonthlyAttendanceRequest } from './request';

@Injectable()
export class GetMonthlyAttendanceHandler {
  constructor(@InjectRepository(Attendance) private readonly repo: Repository<Attendance>) {}

  async execute(query: GetMonthlyAttendanceRequest) {
    const now = new Date();
    const month = query.month || now.getMonth() + 1;
    const year = query.year || now.getFullYear();
    const params: any[] = [month, year];
    let i = 3;

    let sql = `
      SELECT a.date, a.status, a.student_id as "studentId", s.full_name as "studentName",
             sch.group_id as "groupId", g.name as "groupName"
      FROM attendances a
      JOIN students s ON s.id = a.student_id
      JOIN schedules sch ON sch.id = a.schedule_id
      JOIN groups g ON g.id = sch.group_id
      WHERE EXTRACT(MONTH FROM a.date) = $1 AND EXTRACT(YEAR FROM a.date) = $2
    `;

    if (query.groupId) { sql += ` AND sch.group_id = $${i}`; params.push(query.groupId); i++; }
    if (query.studentId) { sql += ` AND a.student_id = $${i}`; params.push(query.studentId); i++; }

    sql += ` ORDER BY a.date, s.full_name`;
    const data = await this.repo.query(sql, params);
    return { month, year, data };
  }
}