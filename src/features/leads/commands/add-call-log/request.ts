import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { CallResult } from '../../../../common/types';

export class AddCallLogRequest {
  @ApiProperty() @IsUUID() leadId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiPropertyOptional({ enum: CallResult }) @IsOptional() @IsEnum(CallResult) result?: CallResult;
  @ApiPropertyOptional() @IsOptional() @IsDateString() nextCallAt?: string;
}