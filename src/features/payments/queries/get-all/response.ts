import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, PaymentStatus } from '../../../../common/types';
export class PaymentItem {
  @ApiProperty() id: string; @ApiProperty() studentName: string;
  @ApiProperty({ nullable: true }) groupName: string | null;
  @ApiProperty() amount: number; @ApiProperty({ enum: PaymentMethod }) method: PaymentMethod;
  @ApiProperty({ enum: PaymentStatus }) status: PaymentStatus;
  @ApiProperty({ nullable: true }) paidAt: Date | null;
}