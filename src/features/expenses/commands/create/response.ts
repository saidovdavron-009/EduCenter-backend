import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '../../../../common/types';
export class CreateExpenseResponse { @ApiProperty() id: string; @ApiProperty({ enum: ExpenseCategory }) category: ExpenseCategory; @ApiProperty() amount: number; @ApiProperty() date: Date; @ApiProperty() createdAt: Date; }