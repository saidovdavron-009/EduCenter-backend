import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../../entities/expense.entity';
import { GetAllExpensesRequest } from './request';

@Injectable()
export class GetAllExpensesHandler {
  constructor(@InjectRepository(Expense) private readonly repo: Repository<Expense>) {}

  async execute(query: GetAllExpensesRequest) {
    const { page = 1, limit = 30, category, dateFrom, dateTo, month, year } = query;
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let i = 1;

    let sql = `SELECT * FROM expenses WHERE 1=1`;
    if (category) { sql += ` AND category = $${i}`; params.push(category); i++; }
    if (dateFrom) { sql += ` AND date >= $${i}`; params.push(dateFrom); i++; }
    if (dateTo) { sql += ` AND date <= $${i}`; params.push(dateTo); i++; }
    if (month) { sql += ` AND EXTRACT(MONTH FROM date) = $${i}`; params.push(month); i++; }
    if (year) { sql += ` AND EXTRACT(YEAR FROM date) = $${i}`; params.push(year); i++; }

    const countSql = `SELECT COUNT(*) FROM (${sql}) as sub`;
    const dataSql = sql + ` ORDER BY date DESC LIMIT $${i} OFFSET $${i + 1}`;
    params.push(limit, offset);

    const [countRes, data] = await Promise.all([
      this.repo.query(countSql, params.slice(0, -2)),
      this.repo.query(dataSql, params),
    ]);

    const total = parseInt(countRes[0]?.count || '0');
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}