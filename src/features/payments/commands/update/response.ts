import { ApiProperty } from '@nestjs/swagger';
export class UpdatePaymentResponse { @ApiProperty() id: string; @ApiProperty() updatedAt: Date; }