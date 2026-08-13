
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsUUID, IsDateString } from 'class-validator';

export class GetAllTeacherAttendanceRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumberString() page?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumberString() limit?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() teacherId?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateTo?: string;
}