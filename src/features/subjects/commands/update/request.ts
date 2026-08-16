import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, Min, IsArray, IsEnum } from 'class-validator';
import { DayOfWeek } from '../../../../common/types';

export class UpdateSubjectRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() level?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) monthlyFee?: number;
  @ApiPropertyOptional({ enum: DayOfWeek, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(DayOfWeek, { each: true })
  days?: DayOfWeek[];
}
