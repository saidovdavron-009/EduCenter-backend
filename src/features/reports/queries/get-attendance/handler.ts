import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../students/entities/student.entity';
import { GetAttendanceStatsRequest } from './request';

@Injectable()
export class GetAttendanceStatsHandler {
  constructor(@InjectRepository(Student) private readonly repo: Repository<Student>) {}

  async execute(query: GetAttendanceStatsRequest) {
    const params: any[] = [];
    let i = 1;
    let where = 'WHERE 1=1';

    if (query.month && query.year) {
      where += ` AND EXTRACT(MONTH FROM a.date)=$${i} AND EXTRACT(YEAR FROM a.date)=$${i+1}`;
      params.push(query.month, query.year); i += 2;
    }
    if (query.groupId) {
      where += ` AND sch.group_id=$${i}`;
      params.push(query.groupId); i++;
    }

    const result = await this.repo.query(
      `SELECT
         COUNT(*) FILTER (WHERE a.status='PRESENT') as present,
         COUNT(*) FILTER (WHERE a.status='ABSENT') as absent,
         COUNT(*) FILTER (WHERE a.status='LATE') as late,
         COUNT(*) FILTER (WHERE a.status='EXCUSED') as excused,
         COUNT(*) as total
       FROM attendances a JOIN schedules sch ON sch.id=a.schedule_id ${where}`,
      params,
    );

    const r = result[0];
    const present = parseInt(r?.present || '0');
    const late = parseInt(r?.late || '0');
    const total = parseInt(r?.total || '0');

    return {
      present, absent: parseInt(r?.absent || '0'),
      late, excused: parseInt(r?.excused || '0'),
      percentage: total > 0 ? Math.round(((present + late) / total) * 100) : 0,
    };
  }
}