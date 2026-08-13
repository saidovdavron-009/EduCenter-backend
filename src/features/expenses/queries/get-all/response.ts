import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '../../../../common/types';
export class ExpenseItem { @ApiProperty() id: string; @ApiProperty({ enum: ExpenseCategory }) category: ExpenseCategory; @ApiProperty() amount: number; @ApiProperty({ nullable: true }) description: string | null; @ApiProperty() date: string; }