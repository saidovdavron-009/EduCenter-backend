import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { GetPaymentReportRequest } from './request';

@Injectable()
export class GetPaymentReportHandler {
  constructor(@InjectRepository(Payment) private readonly repo: Repository<Payment>) {}

  async execute(query: GetPaymentReportRequest) {
    const params: any[] = [];
    let i = 1;

    let where = `WHERE status = 'PAID'`;
    if (query.dateFrom) { where += ` AND paid_at >= $${i}`; params.push(query.dateFrom); i++; }
    if (query.dateTo) { where += ` AND paid_at <= $${i}`; params.push(query.dateTo); i++; }
    if (query.month) { where += ` AND month = $${i}`; params.push(query.month); i++; }
    if (query.year) { where += ` AND year = $${i}`; params.push(query.year); i++; }

    const [totals, byMethod, debt] = await Promise.all([
      this.repo.query(`SELECT COALESCE(SUM(amount - discount), 0) as total FROM payments ${where}`, params),
      this.repo.query(`SELECT method, COALESCE(SUM(amount - discount), 0) as total, COUNT(*) as count FROM payments ${where} GROUP BY method`, params),
      this.repo.query(`SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status IN ('PENDING', 'OVERDUE')`),
    ]);

    const byMethodMap = byMethod.reduce((acc: any, row: any) => {
      acc[row.method] = { total: parseFloat(row.total), count: parseInt(row.count) };
      return acc;
    }, {});

    return {
      totalRevenue: parseFloat(totals[0]?.total || '0'),
      cashRevenue: byMethodMap['CASH']?.total || 0,
      cardRevenue: byMethodMap['CARD']?.total || 0,
      onlineRevenue: (byMethodMap['CLICK']?.total || 0) + (byMethodMap['PAYME']?.total || 0) + (byMethodMap['UZUM']?.total || 0),
      debtTotal: parseFloat(debt[0]?.total || '0'),
      byMethod,
    };
  }
}