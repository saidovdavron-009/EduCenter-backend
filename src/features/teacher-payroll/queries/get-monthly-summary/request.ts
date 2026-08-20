import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMonthlyPayrollSummaryRequest {
  @ApiProperty() @IsUUID() teacherId: string;
  @ApiProperty({ example: 2024 }) @Type(() => Number) @IsInt() year: number;
  @ApiProperty({ example: 3, minimum: 1, maximum: 12 }) @Type(() => Number) @IsInt() @Min(1) @Max(12) month: number;
}
