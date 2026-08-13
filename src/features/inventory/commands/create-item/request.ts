import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryItemRequest {
  @ApiProperty() @IsUUID() branchId: string;
  @ApiProperty({ example: 'English Grammar Book' }) @IsString() name: string;
  @ApiPropertyOptional({ example: 'EGB-001' }) @IsOptional() @IsString() sku?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional({ example: 45000 }) @IsOptional() @IsNumber() @Min(0) @Type(() => Number) price?: number;
  @ApiPropertyOptional({ example: 50 }) @IsOptional() @IsNumber() @Min(0) @Type(() => Number) stockQuantity?: number;
  @ApiPropertyOptional({ example: 5 }) @IsOptional() @IsNumber() @Min(0) @Type(() => Number) minStockLevel?: number;
}