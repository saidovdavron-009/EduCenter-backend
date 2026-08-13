import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsInt, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuizRequest {
  @ApiProperty() @IsUUID() groupId: string;
  @ApiProperty({ example: '1-mavzu testi' }) @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional({ example: 30, description: 'Daqiqada vaqt chegarasi' }) @IsOptional() @IsInt() @Min(1) @Type(() => Number) timeLimitMins?: number;
  @ApiPropertyOptional() @IsOptional() @IsDateString() startAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() endAt?: string;
}