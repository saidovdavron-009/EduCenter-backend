import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class GetStudentsReportRequest {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() month?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() year?: number;
}