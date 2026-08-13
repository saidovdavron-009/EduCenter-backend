import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { GetAllPaymentsRequest } from './request';

@Injectable()
export class GetAllPaymentsHandler {
  constructor(@InjectRepository(Payment) private readonly repo: Repository<Payment>) {}

  async execute(query: GetAllPaymentsRequest) {
    const { page = 1, limit = 30, studentId, groupId, status, method, dateFrom, dateTo, month, year } = query;
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let i = 1;

    let sql = `
      SELECT p.id, s.full_name as "studentName", g.name as "groupName",
             p.amount, p.method, p.status, p.description, p.paid_at as "paidAt", p.due_date as "dueDate",
             p.month, p.year, p.discount, p.created_at as "createdAt"
      FROM payments p
      JOIN students s ON s.id = p.student_id
      LEFT JOIN groups g ON g.id = p.group_id
      WHERE 1=1
    `;

    if (studentId) { sql += ` AND p.student_id = $${i}`; params.push(studentId); i++; }
    if (groupId) { sql += ` AND p.group_id = $${i}`; params.push(groupId); i++; }
    if (status) { sql += ` AND p.status = $${i}`; params.push(status); i++; }
    if (method) { sql += ` AND p.method = $${i}`; params.push(method); i++; }
    if (dateFrom) { sql += ` AND p.paid_at >= $${i}`; params.push(dateFrom); i++; }
    if (dateTo) { sql += ` AND p.paid_at <= $${i}`; params.push(dateTo); i++; }
    if (month) { sql += ` AND p.month = $${i}`; params.push(month); i++; }
    if (year) { sql += ` AND p.year = $${i}`; params.push(year); i++; }

    const countSql = `SELECT COUNT(*) FROM (${sql}) as sub`;
    const dataSql = sql + ` ORDER BY p.created_at DESC LIMIT $${i} OFFSET $${i + 1}`;
    params.push(limit, offset);

    const [countRes, data] = await Promise.all([
      this.repo.query(countSql, params.slice(0, -2)),
      this.repo.query(dataSql, params),
    ]);

    const total = parseInt(countRes[0]?.count || '0');
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}