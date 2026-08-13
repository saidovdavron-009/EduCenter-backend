import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class GetHolidaysRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() branchId?: string;
}