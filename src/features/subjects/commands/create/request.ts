import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, IsNumber, Min, IsArray, IsEnum } from 'class-validator';
import { DayOfWeek } from '../../../../common/types';

export class CreateSubjectRequest {
  @ApiProperty({ example: 'Ingliz tili' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({ example: 'Xorijiy til kursi' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'A1-C2' })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @Min(0)
  monthlyFee: number;

  @ApiProperty({ example: 3, description: 'Fan necha oy davom etadi' })
  @IsNumber()
  @Min(1)
  durationMonths: number;

  @ApiPropertyOptional({ enum: DayOfWeek, isArray: true, description: 'Ushbu fan odatda o\'tiladigan kunlar' })
  @IsOptional()
  @IsArray()
  @IsEnum(DayOfWeek, { each: true })
  days?: DayOfWeek[];
}
