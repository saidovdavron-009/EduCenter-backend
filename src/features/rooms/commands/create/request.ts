import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomRequest {
  @ApiProperty() @IsUUID() branchId: string;
  @ApiProperty({ example: '1-xona' }) @IsString() name: string;
  @ApiProperty({ example: 20 }) @IsInt() @Min(1) @Type(() => Number) capacity: number;
  @ApiPropertyOptional({ example: 2, description: 'Qavat' }) @IsOptional() @IsInt() @Type(() => Number) floor?: number;
}