import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { User } from '../../../auth/entities/user.entity';
import { GetAllStudentsRequest } from './request';
import { GetAllStudentsResponse } from './response';

@Injectable()
export class GetAllStudentsHandler {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(query: GetAllStudentsRequest): Promise<GetAllStudentsResponse> {
    const { page = 1, limit = 20, search, status, groupId, sortBy = 'created_at', sortOrder = 'DESC' } = query;
    const offset = (page - 1) * limit;

    const allowedSortColumns = {
      createdAt: 's.created_at',
      fullName: 's.full_name',
      status: 's.status',
    };
    const orderColumn = allowedSortColumns[sortBy] || 's.created_at';

    let sql = `
      SELECT
        s.id, s.full_name as "fullName", s.phone, s.parent_phone as "parentPhone",
        u.email, u.login_id as "loginId", s.avatar_url as "avatarUrl", s.status, s.created_at as "createdAt",
        COUNT(DISTINCT gs.group_id) FILTER (WHERE gs.status = 'ACTIVE') as "groupCount"
      FROM students s
      LEFT JOIN users u ON u.id = s.user_id
      LEFT JOIN group_students gs ON gs.student_id = s.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      sql += ` AND (s.full_name ILIKE $${paramIndex} OR s.phone ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex} OR u.login_id ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }
    if (status) {
      sql += ` AND s.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }
    if (groupId) {
      sql += ` AND gs.group_id = $${paramIndex} AND gs.status = 'ACTIVE'`;
      params.push(groupId);
      paramIndex++;
    }

    sql += ` GROUP BY s.id, u.email, u.login_id ORDER BY ${orderColumn} ${sortOrder}`;

    const countSql = `SELECT COUNT(*) as total FROM (${sql}) as sub`;
    const dataSql = sql + ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const [countResult, data] = await Promise.all([
      this.studentRepo.query(countSql, params.slice(0, -2)),
      this.studentRepo.query(dataSql, params),
    ]);

    const total = parseInt(countResult[0]?.total || '0');

    return {
      data: data.map((s) => ({ ...s, groupCount: parseInt(s.groupCount) || 0 })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}