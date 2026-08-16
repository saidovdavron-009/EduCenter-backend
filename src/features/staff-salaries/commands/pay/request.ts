import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PayStaffSalaryRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}
