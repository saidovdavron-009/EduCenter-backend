import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PayTeacherSalaryRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}
