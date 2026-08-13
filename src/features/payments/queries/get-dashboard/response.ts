import { ApiProperty } from '@nestjs/swagger';
export class PaymentDashboardResponse {
  @ApiProperty() monthlyRevenue: number;
  @ApiProperty() pendingAmount: number;
  @ApiProperty() totalPaidThisMonth: number;
  @ApiProperty() debtorsCount: number;
  @ApiProperty() recentPayments: any[];
}