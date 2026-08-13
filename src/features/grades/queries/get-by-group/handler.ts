import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../../entities/grade.entity';
import { GetGradesByGroupRequest } from './request';

@Injectable()
export class GetGradesByGroupHandler {
  constructor(@InjectRepository(Grade) private readonly repo: Repository<Grade>) {}

  async execute(query: GetGradesByGroupRequest) {
    const params: any[] = [query.groupId];
    let i = 2;

    let sql = `
      SELECT gr.id, s.id as "studentId", s.full_name as "studentName",
             gr.type, gr.score, gr.max_score as "maxScore", gr.comment, gr.date
      FROM grades gr
      JOIN students s ON s.id = gr.student_id
      WHERE gr.group_id = $1
    `;

    if (query.type) { sql += ` AND gr.type = $${i}`; params.push(query.type); i++; }
    if (query.dateFrom) { sql += ` AND gr.date >= $${i}`; params.push(query.dateFrom); i++; }
    if (query.dateTo) { sql += ` AND gr.date <= $${i}`; params.push(query.dateTo); i++; }

    sql += ` ORDER BY s.full_name, gr.date DESC`;
    const data = await this.repo.query(sql, params);
    return { groupId: query.groupId, data };
  }
}