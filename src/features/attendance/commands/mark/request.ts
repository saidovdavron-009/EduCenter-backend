import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsDateString, IsOptional, IsString } from 'class-validator';
import { AttendanceStatus } from '../../../../common/types';

export class MarkAttendanceRequest {
  @ApiProperty() @IsUUID() scheduleId: string;
  @ApiProperty() @IsUUID() studentId: string;
  @ApiProperty({ enum: AttendanceStatus }) @IsEnum(AttendanceStatus) status: AttendanceStatus;
  @ApiProperty({ example: '2024-03-15' }) @IsDateString() date: string;
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}