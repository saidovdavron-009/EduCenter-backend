import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDateString, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateStaffSalaryRequest {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) baseAmount?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) bonus?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) fine?: number;
  @ApiPropertyOptional() @IsOptional() @IsDateString() periodStart?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() periodEnd?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}
