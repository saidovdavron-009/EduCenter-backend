import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../students/entities/student.entity';

@Injectable()
export class GetTeachersReportHandler {
  constructor(@InjectRepository(Student) private readonly repo: Repository<Student>) {}

  async execute() {
    const [count, teachers] = await Promise.all([
      this.repo.query(`SELECT COUNT(*) FROM teachers WHERE is_active=true`),
      this.repo.query(
        `SELECT t.id, t.full_name as "fullName", string_to_array(t.subjects, ',') as subjects,
                COUNT(DISTINCT g.id) FILTER (WHERE g.status='ACTIVE') as "groupCount",
                COUNT(DISTINCT gs.student_id) FILTER (WHERE gs.status='ACTIVE') as "studentCount"
         FROM teachers t
         LEFT JOIN groups g ON g.teacher_id=t.id
         LEFT JOIN group_students gs ON gs.group_id=g.id
         WHERE t.is_active=true
         GROUP BY t.id ORDER BY "studentCount" DESC`,
      ),
    ]);

    return {
      total: parseInt(count[0]?.count || '0'),
      activeTeachers: teachers.map((t: any) => ({
        ...t,
        groupCount: parseInt(t.groupCount) || 0,
        studentCount: parseInt(t.studentCount) || 0,
      })),
    };
  }
}