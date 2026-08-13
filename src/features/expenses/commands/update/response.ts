import { ApiProperty } from '@nestjs/swagger';
export class UpdateExpenseResponse { @ApiProperty() id: string; @ApiProperty() updatedAt: Date; }