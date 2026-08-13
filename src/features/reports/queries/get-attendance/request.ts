import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class GetAttendanceStatsRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() month?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() year?: number;
}