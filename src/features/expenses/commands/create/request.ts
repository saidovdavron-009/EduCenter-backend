
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, Min, IsDateString, IsOptional, IsString } from 'class-validator';
import { ExpenseCategory } from '../../../../common/types';
export class CreateExpenseRequest {
  @ApiProperty({ enum: ExpenseCategory }) @IsEnum(ExpenseCategory) category: ExpenseCategory;
  @ApiProperty({ example: 2000000 }) @IsNumber() @Min(0) amount: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty({ example: '2024-03-01' }) @IsDateString() date: string;
}