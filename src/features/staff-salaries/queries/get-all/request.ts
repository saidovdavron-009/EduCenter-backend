import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllStaffSalariesRequest {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) page?: number = 1;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) limit?: number = 20;
  @ApiPropertyOptional() @IsOptional() @IsUUID() employeeId?: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Boolean) @IsBoolean() isPaid?: boolean;
}
