import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsDateString, IsOptional, IsNumber, Min } from 'class-validator';
export class CreateHomeworkRequest {
  @ApiProperty() @IsUUID() groupId: string;
  @ApiPropertyOptional({ description: 'Faqat ADMIN uchun majburiy (TEACHER o\'zining ID\'sidan foydalanadi)' })
  @IsOptional() @IsUUID() teacherId?: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty({ example: '2024-03-20' }) @IsDateString() dueDate: string;
  @ApiPropertyOptional({ example: 100 }) @IsOptional() @IsNumber() @Min(1) maxScore?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() attachmentUrl?: string;
}