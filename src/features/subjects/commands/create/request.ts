import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateSubjectRequest {
  @ApiProperty({ example: 'Ingliz tili' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({ example: 'Xorijiy til kursi' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'A1-C2' })
  @IsOptional()
  @IsString()
  level?: string;
}