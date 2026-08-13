import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from '../../entities/homework.entity';
import { GetAllHomeworkRequest } from './request';

@Injectable()
export class GetAllHomeworkHandler {
  constructor(@InjectRepository(Homework) private readonly repo: Repository<Homework>) {}

  async execute(query: GetAllHomeworkRequest) {
    const { page = 1, limit = 20, groupId, teacherId } = query;
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let i = 1;

    let sql = `
      SELECT hw.id, hw.title, hw.description, g.name as "groupName", t.full_name as "teacherName",
             hw.due_date as "dueDate", hw.max_score as "maxScore", hw.created_at as "createdAt",
             COUNT(DISTINCT hs.id) as "submissionsCount"
      FROM homework_assignments hw
      JOIN groups g ON g.id = hw.group_id
      LEFT JOIN teachers t ON t.id = hw.teacher_id
      LEFT JOIN homework_submissions hs ON hs.homework_id = hw.id
      WHERE 1=1
    `;

    if (groupId) { sql += ` AND hw.group_id = $${i}`; params.push(groupId); i++; }
    if (teacherId) { sql += ` AND hw.teacher_id = $${i}`; params.push(teacherId); i++; }

    sql += ` GROUP BY hw.id, g.name, t.full_name ORDER BY hw.due_date DESC LIMIT $${i} OFFSET $${i + 1}`;
    params.push(limit, offset);

    const data = await this.repo.query(sql, params);
    const total = data.length;
    return {
      data: data.map((d: any) => ({ ...d, submissionsCount: parseInt(d.submissionsCount) || 0 })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}