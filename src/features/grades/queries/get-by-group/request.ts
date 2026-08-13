import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { GradeType } from '../../../../common/types';
export class GetGradesByGroupRequest {
  groupId: string;
  @ApiPropertyOptional({ enum: GradeType }) @IsOptional() @IsEnum(GradeType) type?: GradeType;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateTo?: string;
}