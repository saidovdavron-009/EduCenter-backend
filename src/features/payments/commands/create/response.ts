import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, PaymentStatus } from '../../../../common/types';
export class CreatePaymentResponse {
  @ApiProperty() id: string; @ApiProperty() studentId: string; @ApiProperty() amount: number;
  @ApiProperty({ enum: PaymentMethod }) method: PaymentMethod;
  @ApiProperty({ enum: PaymentStatus }) status: PaymentStatus;
  @ApiProperty() createdAt: Date;
}