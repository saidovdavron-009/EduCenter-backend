import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsEnum } from 'class-validator';
import { MaterialType } from '../../../../common/types';
export class GetAllMaterialsRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() teacherId?: string;
  @ApiPropertyOptional({ enum: MaterialType }) @IsOptional() @IsEnum(MaterialType) type?: MaterialType;
}