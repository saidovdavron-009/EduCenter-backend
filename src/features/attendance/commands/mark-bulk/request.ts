import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsArray, ValidateNested, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceStatus } from '../../../../common/types';

export class AttendanceItem {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiProperty({ enum: AttendanceStatus }) @IsEnum(AttendanceStatus) status: AttendanceStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}

export class MarkBulkAttendanceRequest {
  @ApiProperty() @IsUUID() scheduleId: string;
  @ApiProperty({ example: '2024-03-15' }) @IsDateString() date: string;
  @ApiProperty({ type: [AttendanceItem] }) @IsArray() @ValidateNested({ each: true }) @Type(() => AttendanceItem) attendances: AttendanceItem[];
  @ApiPropertyOptional() @IsOptional() @IsString() lateCorrectionReason?: string;
}