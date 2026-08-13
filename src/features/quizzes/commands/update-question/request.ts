import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsInt, IsBoolean, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateQuestionOptionDto {
  @ApiPropertyOptional() @IsString() optionText: string;
  @ApiPropertyOptional() @IsBoolean() isCorrect: boolean;
}

export class UpdateQuestionRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() questionText?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() imageUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) points?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Type(() => Number) sortOrder?: number;
  @ApiPropertyOptional({ type: [UpdateQuestionOptionDto] }) @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => UpdateQuestionOptionDto) options?: UpdateQuestionOptionDto[];
}
