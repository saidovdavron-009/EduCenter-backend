import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, Matches } from 'class-validator';
import { DayOfWeek } from '../../../../common/types';
export class UpdateScheduleRequest {
  @ApiPropertyOptional({ enum: DayOfWeek }) @IsOptional() @IsEnum(DayOfWeek) dayOfWeek?: DayOfWeek;
  @ApiPropertyOptional() @IsOptional() @IsString() @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/) startTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/) endTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() room?: string;
}
