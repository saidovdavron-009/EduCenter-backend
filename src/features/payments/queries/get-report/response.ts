import { ApiProperty } from '@nestjs/swagger';
export class PaymentReportResponse {
  @ApiProperty() totalRevenue: number; @ApiProperty() cashRevenue: number;
  @ApiProperty() cardRevenue: number; @ApiProperty() onlineRevenue: number;
  @ApiProperty() debtTotal: number; @ApiProperty() byMethod: any[];
}