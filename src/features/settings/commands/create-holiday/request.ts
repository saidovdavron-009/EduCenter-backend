import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateHolidayRequest {
  @ApiProperty({ example: 'Navro\'z' }) @IsString() name: string;
  @ApiProperty({ example: '2024-03-21' }) @IsDateString() startDate: string;
  @ApiProperty({ example: '2024-03-23' }) @IsDateString() endDate: string;
  @ApiPropertyOptional({ description: 'null = barcha filiallar' }) @IsOptional() @IsUUID() branchId?: string;
}