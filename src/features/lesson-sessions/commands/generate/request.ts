import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class GenerateLessonSessionsRequest {
  @ApiProperty({ example: '2024-03-01' }) @IsDateString() periodStart: string;
  @ApiProperty({ example: '2024-03-31' }) @IsDateString() periodEnd: string;
}
