import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { GradeType } from '../../../../common/types';
export class UpdateGradeRequest {
  @ApiPropertyOptional({ enum: GradeType }) @IsOptional() @IsEnum(GradeType) type?: GradeType;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) score?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) maxScore?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() comment?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() date?: string;
}