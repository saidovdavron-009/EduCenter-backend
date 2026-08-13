import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsNumber, IsOptional, IsDateString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { DiscountType } from '../../../../common/types';

export class CreateDiscountRequest {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
  @ApiProperty({ enum: DiscountType }) @IsEnum(DiscountType) type: DiscountType;
  @ApiProperty({ example: 10, description: 'Foizda chegirma (0-100)' }) @Type(() => Number) @IsNumber() @Min(0) @Max(100) percentage: number;
  @ApiPropertyOptional({ example: '2024-12-31' }) @IsOptional() @IsDateString() expiredAt?: string;
}
