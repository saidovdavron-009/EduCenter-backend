import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsNumber, Min, Max, IsDateString, IsOptional, IsString } from 'class-validator';
import { GradeType } from '../../../../common/types';
export class CreateGradeRequest {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
  @ApiPropertyOptional({ description: 'Faqat ADMIN uchun majburiy (TEACHER o\'zining ID\'sidan foydalanadi)' })
  @IsOptional() @IsUUID() teacherId?: string;
  @ApiProperty({ enum: GradeType }) @IsEnum(GradeType) type: GradeType;
  @ApiProperty({ example: 85 }) @IsNumber() @Min(0) score: number;
  @ApiPropertyOptional({ example: 100 }) @IsOptional() @IsNumber() @Min(1) maxScore?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() comment?: string;
  @ApiProperty({ example: '2024-03-15' }) @IsDateString() date: string;
}