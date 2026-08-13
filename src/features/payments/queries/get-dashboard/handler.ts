import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';

@Injectable()
export class GetPaymentDashboardHandler {
  constructor(@InjectRepository(Payment) private readonly repo: Repository<Payment>) {}

  async execute() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const [monthlyRevenue, pendingAmount, debtors, recent] = await Promise.all([
      this.repo.query(
        `SELECT COALESCE(SUM(amount - discount), 0) as total FROM payments WHERE status = 'PAID' AND month = $1 AND year = $2`,
        [month, year],
      ),
      this.repo.query(`SELECT COALESCE(SUM(amount - discount), 0) as total FROM payments WHERE status = 'PENDING'`),
      this.repo.query(`SELECT COUNT(DISTINCT student_id) as count FROM payments WHERE status = 'OVERDUE'`),
      this.repo.query(
        `SELECT p.id, s.full_name as "studentName", p.amount, p.method, p.paid_at as "paidAt"
         FROM payments p JOIN students s ON s.id = p.student_id
         WHERE p.status = 'PAID' ORDER BY p.paid_at DESC LIMIT 10`,
      ),
    ]);

    return {
      monthlyRevenue: parseFloat(monthlyRevenue[0]?.total || '0'),
      pendingAmount: parseFloat(pendingAmount[0]?.total || '0'),
      totalPaidThisMonth: parseFloat(monthlyRevenue[0]?.total || '0'),
      debtorsCount: parseInt(debtors[0]?.count || '0'),
      recentPayments: recent,
    };
  }
}