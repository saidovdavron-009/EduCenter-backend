import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class StockInRequest {
  @ApiProperty() @IsUUID() itemId: string;
  @ApiProperty({ example: 20 }) @IsInt() @Min(1) @Type(() => Number) quantity: number;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
}