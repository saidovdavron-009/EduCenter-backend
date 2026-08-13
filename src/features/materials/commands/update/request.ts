import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { MaterialType } from '../../../../common/types';
export class UpdateMaterialRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() title?: string;
  @ApiPropertyOptional({ enum: MaterialType }) @IsOptional() @IsEnum(MaterialType) type?: MaterialType;
  @ApiPropertyOptional() @IsOptional() @IsString() url?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
