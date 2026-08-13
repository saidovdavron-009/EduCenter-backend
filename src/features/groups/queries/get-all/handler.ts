import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { GetAllGroupsRequest } from './request';

@Injectable()
export class GetAllGroupsHandler {
  constructor(@InjectRepository(Group) private readonly repo: Repository<Group>) {}

  async execute(query: GetAllGroupsRequest) {
    const { page = 1, limit = 20, search, status, subjectId, teacherId } = query;
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let i = 1;

    let sql = `
      SELECT g.id, g.name, s.name as "subjectName", t.full_name as "teacherName",
             g.capacity, g.monthly_fee as "monthlyFee", g.status, g.created_at as "createdAt",
             COUNT(DISTINCT gs.student_id) FILTER (WHERE gs.status='ACTIVE') as "currentCount"
      FROM groups g
      LEFT JOIN subjects s ON s.id = g.subject_id
      LEFT JOIN teachers t ON t.id = g.teacher_id
      LEFT JOIN group_students gs ON gs.group_id = g.id
      WHERE 1=1
    `;

    if (search) { sql += ` AND g.name ILIKE $${i}`; params.push(`%${search}%`); i++; }
    if (status) { sql += ` AND g.status = $${i}`; params.push(status); i++; }
    if (subjectId) { sql += ` AND g.subject_id = $${i}`; params.push(subjectId); i++; }
    if (teacherId) { sql += ` AND g.teacher_id = $${i}`; params.push(teacherId); i++; }

    sql += ` GROUP BY g.id, s.name, t.full_name ORDER BY g.created_at DESC LIMIT $${i} OFFSET $${i + 1}`;
    params.push(limit, offset);

    const data = await this.repo.query(sql, params);
    const total = data.length > 0 ? parseInt((await this.repo.query(`SELECT COUNT(*) FROM groups WHERE 1=1`))[0].count) : 0;

    return {
      data: data.map((g) => ({ ...g, currentCount: parseInt(g.currentCount) || 0 })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}