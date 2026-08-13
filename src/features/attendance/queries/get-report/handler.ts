import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../entities/attendance.entity';
import { GetAttendanceReportRequest } from './request';

@Injectable()
export class GetAttendanceReportHandler {
  constructor(@InjectRepository(Attendance) private readonly repo: Repository<Attendance>) {}

  async execute(query: GetAttendanceReportRequest) {
    const params: any[] = [];
    let i = 1;

    let sql = `
      SELECT
        s.id as "studentId", s.full_name as "studentName",
        COUNT(*) FILTER (WHERE a.status = 'PRESENT') as present,
        COUNT(*) FILTER (WHERE a.status = 'ABSENT') as absent,
        COUNT(*) FILTER (WHERE a.status = 'LATE') as late,
        COUNT(*) FILTER (WHERE a.status = 'EXCUSED') as excused,
        COUNT(*) as total
      FROM attendances a
      JOIN students s ON s.id = a.student_id
      JOIN schedules sch ON sch.id = a.schedule_id
      WHERE 1=1
    `;

    if (query.groupId) { sql += ` AND sch.group_id = $${i}`; params.push(query.groupId); i++; }
    if (query.studentId) { sql += ` AND a.student_id = $${i}`; params.push(query.studentId); i++; }
    if (query.dateFrom) { sql += ` AND a.date >= $${i}`; params.push(query.dateFrom); i++; }
    if (query.dateTo) { sql += ` AND a.date <= $${i}`; params.push(query.dateTo); i++; }
    if (query.month && query.year) {
      sql += ` AND EXTRACT(MONTH FROM a.date) = $${i} AND EXTRACT(YEAR FROM a.date) = $${i + 1}`;
      params.push(query.month, query.year); i += 2;
    }

    sql += ` GROUP BY s.id, s.full_name ORDER BY s.full_name`;

    const rows = await this.repo.query(sql, params);
    return rows.map((r) => ({
      ...r,
      present: parseInt(r.present) || 0,
      absent: parseInt(r.absent) || 0,
      late: parseInt(r.late) || 0,
      excused: parseInt(r.excused) || 0,
      total: parseInt(r.total) || 0,
      percentage: r.total > 0
        ? Math.round(((parseInt(r.present) + parseInt(r.late)) / parseInt(r.total)) * 100)
        : 0,
    }));
  }
}