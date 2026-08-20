import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class GetTodayLessonSessionsRequest {
  // Berilmasa — server bugungi sanasi ishlatiladi.
  @ApiPropertyOptional({ example: '2024-03-15' }) @IsOptional() @IsDateString() date?: string;
}
