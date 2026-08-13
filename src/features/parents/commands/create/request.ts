import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateParentRequest {
  @ApiProperty({ example: 'Karimov Alisher' }) @IsString() fullName: string;
  @ApiProperty({ example: '+998901234567' }) @IsString() phone: string;

  @ApiPropertyOptional({ example: 'student-uuid', description: 'Bog\'lanadigan o\'quvchi ID (ixtiyoriy)' })
  @IsOptional()
  @IsUUID()
  studentId?: string;
}