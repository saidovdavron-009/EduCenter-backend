import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TeacherAttendanceStatus } from '../../../../common/types';

export class UpdateTeacherAttendanceRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() checkIn?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() checkOut?: string;
  @ApiPropertyOptional({ enum: TeacherAttendanceStatus }) @IsOptional() @IsEnum(TeacherAttendanceStatus) status?: TeacherAttendanceStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}