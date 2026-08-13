import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../students/entities/student.entity';
import { GetRevenueRequest } from './request';

const MONTH_NAMES = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

@Injectable()
export class GetRevenueHandler {
  constructor(@InjectRepository(Student) private readonly repo: Repository<Student>) {}

  async execute(query: GetRevenueRequest) {
    const year = query.year || new Date().getFullYear();

    const [revenues, expenses] = await Promise.all([
      this.repo.query(
        `SELECT month, COALESCE(SUM(amount - discount), 0) as revenue
         FROM payments WHERE status='PAID' AND year=$1 GROUP BY month ORDER BY month`,
        [year],
      ),
      this.repo.query(
        `SELECT EXTRACT(MONTH FROM date) as month, COALESCE(SUM(amount), 0) as expenses
         FROM expenses WHERE EXTRACT(YEAR FROM date)=$1 GROUP BY month ORDER BY month`,
        [year],
      ),
    ]);

    const revenueMap: Record<number, number> = {};
    revenues.forEach((r: any) => { revenueMap[r.month] = parseFloat(r.revenue); });

    const expenseMap: Record<number, number> = {};
    expenses.forEach((e: any) => { expenseMap[parseInt(e.month)] = parseFloat(e.expenses); });

    return Array.from({ length: 12 }, (_, i) => {
      const m = i + 1;
      const revenue = revenueMap[m] || 0;
      const expense = expenseMap[m] || 0;
      return { month: MONTH_NAMES[i], revenue, expenses: expense, profit: revenue - expense };
    });
  }
}