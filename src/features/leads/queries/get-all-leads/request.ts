import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsUUID, IsEnum, IsString } from 'class-validator';
import { LeadStatus } from '../../../../common/types';

export class GetAllLeadsRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumberString() page?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumberString() limit?: string;
  @ApiPropertyOptional({ enum: LeadStatus }) @IsOptional() @IsEnum(LeadStatus) status?: LeadStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() assignedAdminId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() branchId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
}