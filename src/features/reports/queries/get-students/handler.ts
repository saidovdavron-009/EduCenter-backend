import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../students/entities/student.entity';
import { GetStudentsReportRequest } from './request';

@Injectable()
export class GetStudentsReportHandler {
  constructor(@InjectRepository(Student) private readonly repo: Repository<Student>) {}

  async execute(query: GetStudentsReportRequest) {
    const month = query.month || new Date().getMonth() + 1;
    const year = query.year || new Date().getFullYear();

    const [stats, newStudents, topStudents] = await Promise.all([
      this.repo.query(
        `SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status='ACTIVE') as active,
                COUNT(*) FILTER (WHERE status='FROZEN') as frozen,
                COUNT(*) FILTER (WHERE status='GRADUATED') as graduated FROM students`,
      ),
      this.repo.query(
        `SELECT COUNT(*) as count FROM students
         WHERE EXTRACT(MONTH FROM created_at)=$1 AND EXTRACT(YEAR FROM created_at)=$2`,
        [month, year],
      ),
      this.repo.query(
        `SELECT s.id, s.full_name as "fullName",
                AVG(gr.score/gr.max_score*100) as "avgScore"
         FROM students s
         JOIN grades gr ON gr.student_id = s.id
         WHERE s.status='ACTIVE'
         GROUP BY s.id ORDER BY "avgScore" DESC LIMIT 10`,
      ),
    ]);

    return {
      total: parseInt(stats[0]?.total || '0'),
      active: parseInt(stats[0]?.active || '0'),
      frozen: parseInt(stats[0]?.frozen || '0'),
      graduated: parseInt(stats[0]?.graduated || '0'),
      newThisMonth: parseInt(newStudents[0]?.count || '0'),
      topStudents: topStudents.map((s: any) => ({ ...s, avgScore: parseFloat(s.avgScore || '0').toFixed(1) })),
    };
  }
}