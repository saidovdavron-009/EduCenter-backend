import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsEnum } from 'class-validator';
import { DayOfWeek } from '../../../../common/types';
export class GetAllSchedulesRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() teacherId?: string;
  @ApiPropertyOptional({ enum: DayOfWeek }) @IsOptional() @IsEnum(DayOfWeek) dayOfWeek?: DayOfWeek;
}