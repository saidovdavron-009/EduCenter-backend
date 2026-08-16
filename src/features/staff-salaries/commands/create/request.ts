import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsOptional, IsDateString, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStaffSalaryRequest {
  @ApiProperty() @IsUUID() employeeId: string;
  @ApiProperty({ example: 2000000 }) @Type(() => Number) @IsNumber() @Min(0) baseAmount: number;
  @ApiPropertyOptional({ default: 0 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(0) bonus?: number;
  @ApiPropertyOptional({ default: 0 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(0) fine?: number;
  @ApiProperty({ example: '2024-01-01' }) @IsDateString() periodStart: string;
  @ApiProperty({ example: '2024-01-31' }) @IsDateString() periodEnd: string;
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}
