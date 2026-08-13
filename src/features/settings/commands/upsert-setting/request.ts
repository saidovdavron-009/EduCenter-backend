import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { AppSettingType } from '../../../../common/types';

export class UpsertSettingRequest {
  @ApiProperty({ example: 'center_name' }) @IsString() key: string;
  @ApiPropertyOptional({ example: 'EduCenter Pro' }) @IsOptional() @IsString() value?: string;
  @ApiPropertyOptional({ enum: AppSettingType }) @IsOptional() @IsEnum(AppSettingType) type?: AppSettingType;
}