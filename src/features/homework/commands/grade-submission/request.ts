import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
export class GradeSubmissionRequest {
  submissionId: string;
  @ApiProperty() @IsNumber() @Min(0) score: number;
  @ApiPropertyOptional() @IsOptional() @IsString() feedback?: string;
}