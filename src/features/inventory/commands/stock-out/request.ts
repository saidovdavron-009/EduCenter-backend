import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class StockOutRequest {
  @ApiProperty() @IsUUID() itemId: string;
  @ApiProperty({ example: 5 }) @IsInt() @Min(1) @Type(() => Number) quantity: number;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
}