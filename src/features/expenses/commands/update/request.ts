import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsDateString, Min } from 'class-validator';
import { ExpenseCategory } from '../../../../common/types';
export class UpdateExpenseRequest {
  @ApiPropertyOptional({ enum: ExpenseCategory }) @IsOptional() @IsEnum(ExpenseCategory) category?: ExpenseCategory;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) amount?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() date?: string;
}