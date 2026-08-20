import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsNumber, Min, IsEnum, IsDateString } from 'class-validator';
import { GroupStatus } from '../../../../common/types';

export class UpdateGroupRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() subjectId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() teacherId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() branchId?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) capacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() level?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) monthlyFee?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) monthlyPriceForTeacher?: number;
  @ApiPropertyOptional({ enum: GroupStatus }) @IsOptional() @IsEnum(GroupStatus) status?: GroupStatus;
  @ApiPropertyOptional() @IsOptional() @IsDateString() startDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() endDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}