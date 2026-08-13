import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';
import { MaterialType } from '../../../../common/types';
export class CreateMaterialRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
  @ApiPropertyOptional({ description: 'Faqat ADMIN uchun majburiy (TEACHER o\'zining ID\'sidan foydalanadi)' })
  @IsOptional() @IsUUID() teacherId?: string;
  @ApiProperty() @IsString() title: string;
  @ApiProperty({ enum: MaterialType }) @IsEnum(MaterialType) type: MaterialType;
  @ApiProperty() @IsString() url: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}