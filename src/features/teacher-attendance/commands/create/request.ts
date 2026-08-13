import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsOptional, IsEnum, IsString } from 'class-validator';
import { TeacherAttendanceStatus } from '../../../../common/types';

export class CreateTeacherAttendanceRequest {
  @ApiProperty() @IsUUID() teacherId: string;
  @ApiProperty({ example: '2024-01-15' }) @IsDateString() date: string;
  @ApiPropertyOptional() @IsOptional() @IsString() checkIn?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() checkOut?: string;
  @ApiPropertyOptional({ enum: TeacherAttendanceStatus }) @IsOptional() @IsEnum(TeacherAttendanceStatus) status?: TeacherAttendanceStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}