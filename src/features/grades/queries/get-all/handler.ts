import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../../entities/grade.entity';
import { GetAllGradesRequest } from './request';

@Injectable()
export class GetAllGradesHandler {
  constructor(@InjectRepository(Grade) private readonly repo: Repository<Grade>) {}

  async execute(query: GetAllGradesRequest) {
    const { page = 1, limit = 30, studentId, groupId, teacherId, type, dateFrom, dateTo } = query;
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let i = 1;

    let sql = `
      SELECT gr.id, gr.group_id as "groupId", g.name as "groupName", s.full_name as "studentName", t.full_name as "teacherName",
             gr.type, gr.score, gr.max_score as "maxScore", gr.comment, gr.date, gr.created_at as "createdAt"
      FROM grades gr
      JOIN students s ON s.id = gr.student_id
      LEFT JOIN teachers t ON t.id = gr.teacher_id
      LEFT JOIN groups g ON g.id = gr.group_id
      WHERE 1=1
    `;

    if (studentId) { sql += ` AND gr.student_id = $${i}`; params.push(studentId); i++; }
    if (groupId) { sql += ` AND gr.group_id = $${i}`; params.push(groupId); i++; }
    if (teacherId) { sql += ` AND gr.teacher_id = $${i}`; params.push(teacherId); i++; }
    if (type) { sql += ` AND gr.type = $${i}`; params.push(type); i++; }
    if (dateFrom) { sql += ` AND gr.date >= $${i}`; params.push(dateFrom); i++; }
    if (dateTo) { sql += ` AND gr.date <= $${i}`; params.push(dateTo); i++; }

    const countSql = `SELECT COUNT(*) FROM (${sql}) as sub`;
    const dataSql = sql + ` ORDER BY gr.date DESC LIMIT $${i} OFFSET $${i + 1}`;
    params.push(limit, offset);

    const [countRes, data] = await Promise.all([
      this.repo.query(countSql, params.slice(0, -2)),
      this.repo.query(dataSql, params),
    ]);

    const total = parseInt(countRes[0]?.count || '0');
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}