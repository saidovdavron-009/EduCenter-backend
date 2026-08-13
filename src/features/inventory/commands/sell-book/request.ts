import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SellBookRequest {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiProperty() @IsUUID() itemId: string;
  @ApiPropertyOptional({ example: 1 }) @IsOptional() @IsInt() @Min(1) @Type(() => Number) quantity?: number;
  @ApiProperty({ example: 45000 }) @IsNumber() @Min(0) @Type(() => Number) amount: number;
}