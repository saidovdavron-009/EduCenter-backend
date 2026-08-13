import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class GetPaymentReportRequest {
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateTo?: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() month?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() year?: number;
}