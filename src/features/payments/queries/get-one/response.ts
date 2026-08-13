import { ApiProperty } from '@nestjs/swagger';
export class GetOnePaymentResponse { @ApiProperty() id: string; @ApiProperty() studentId: string; @ApiProperty() amount: number; }