import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsString, IsOptional, Matches } from 'class-validator';
import { DayOfWeek } from '../../../../common/types';

export class CreateScheduleRequest {
  @ApiProperty() @IsUUID() groupId: string;
  @ApiProperty({ enum: DayOfWeek }) @IsEnum(DayOfWeek) dayOfWeek: DayOfWeek;
  @ApiProperty({ example: '09:00' }) @IsString() @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime HH:MM formatida bo\'lishi kerak' }) startTime: string;
  @ApiProperty({ example: '11:00' }) @IsString() @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime HH:MM formatida bo\'lishi kerak' }) endTime: string;
  @ApiPropertyOptional({ example: '101-xona' }) @IsOptional() @IsString() room?: string;
}