import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString, IsEnum } from 'class-validator';
import { SmsStatus } from '../../../../common/types';

export class GetSmsLogsRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumberString() page?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumberString() limit?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional({ enum: SmsStatus }) @IsOptional() @IsEnum(SmsStatus) status?: SmsStatus;
}