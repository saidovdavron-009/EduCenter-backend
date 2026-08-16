import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsNumber, Min, IsEnum, IsDateString } from 'class-validator';
import { GroupStatus } from '../../../../common/types';

export class CreateGroupRequest {
  @ApiProperty({ example: 'Ingliz tili - A1 guruh' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'subject-uuid' })
  @IsUUID()
  subjectId: string;

  @ApiProperty({ example: 'teacher-uuid' })
  @IsUUID()
  teacherId: string;

  @ApiProperty({ example: 'branch-uuid' })
  @IsUUID()
  branchId: string;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional() @IsNumber() @Min(1)
  capacity?: number;

  @ApiPropertyOptional({ example: 'A1' })
  @IsOptional() @IsString()
  level?: string;

  @ApiProperty({ example: 600000 })
  @IsNumber() @Min(0)
  monthlyFee: number;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional() @IsDateString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;
}