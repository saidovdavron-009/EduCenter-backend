import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsOptional, IsEnum, IsString } from 'class-validator';
import { TeacherAttendanceStatus } from '../../../../common/types';

export class CreateStaffAttendanceRequest {
  @ApiProperty() @IsUUID() userId: string;
  @ApiProperty({ example: '2024-01-15' }) @IsDateString() date: string;
  @ApiPropertyOptional() @IsOptional() @IsString() checkIn?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() checkOut?: string;
  @ApiPropertyOptional({ enum: TeacherAttendanceStatus }) @IsOptional() @IsEnum(TeacherAttendanceStatus) status?: TeacherAttendanceStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
  // Berilmasa — common/constants/work-hours dagi standart ish vaqti ishlatiladi.
  @ApiPropertyOptional() @IsOptional() @IsString() plannedStartTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() plannedEndTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() lateCorrectionReason?: string;
}
