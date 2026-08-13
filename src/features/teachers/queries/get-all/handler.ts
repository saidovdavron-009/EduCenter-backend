import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../entities/teacher.entity';
import { GetAllTeachersRequest } from './request';

@Injectable()
export class GetAllTeachersHandler {
  constructor(@InjectRepository(Teacher) private readonly repo: Repository<Teacher>) {}

  async execute(query: GetAllTeachersRequest) {
    const { page = 1, limit = 20, search, sortOrder = 'DESC', status } = query;
    const offset = (page - 1) * limit;

    let where = 'WHERE 1=1';
    const params: any[] = [];
    let i = 1;

    if (search) {
      where += ` AND (t.full_name ILIKE $${i} OR t.phone ILIKE $${i})`;
      params.push(`%${search}%`); i++;
    }
    if (status === 'ACTIVE') {
      where += ` AND t.is_active = true`;
    } else if (status === 'INACTIVE') {
      where += ` AND t.is_active = false`;
    }

    const countParams = [...params];
    const sql = `
      SELECT t.id, t.full_name as "fullName", t.phone, t.avatar_url as "avatarUrl",
             string_to_array(t.subjects, ',') as subjects, t.salary, t.is_active as "isActive", t.created_at as "createdAt",
             COUNT(DISTINCT g.id) FILTER (WHERE g.status = 'ACTIVE') as "groupCount"
      FROM teachers t
      LEFT JOIN groups g ON g.teacher_id = t.id
      ${where}
      GROUP BY t.id ORDER BY t.created_at ${sortOrder} LIMIT $${i} OFFSET $${i + 1}
    `;
    params.push(limit, offset);

    const countSql = `SELECT COUNT(*) FROM teachers t ${where}`;
    const [data, countResult] = await Promise.all([
      this.repo.query(sql, params),
      this.repo.query(countSql, countParams),
    ]);

    const total = parseInt(countResult[0]?.count || '0');
    return {
      data: data.map((t) => ({ ...t, groupCount: parseInt(t.groupCount) || 0 })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}