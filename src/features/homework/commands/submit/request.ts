import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class SubmitHomeworkRequest {
  homeworkId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() text?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() fileUrl?: string;
}