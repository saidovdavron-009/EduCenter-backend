import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsUUID, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAllInventoryItemsRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumberString() page?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumberString() limit?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() branchId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @Transform(({ value }) => value === 'true') @IsBoolean() lowStock?: boolean;
}