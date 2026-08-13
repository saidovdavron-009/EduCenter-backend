import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsInt, IsBoolean, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuizOptionDto {
  @ApiProperty() @IsString() optionText: string;
  @ApiProperty() @IsBoolean() isCorrect: boolean;
}

export class AddQuestionRequest {
  @ApiProperty({ type: 'text' }) @IsString() questionText: string;
  @ApiPropertyOptional() @IsOptional() @IsString() imageUrl?: string;
  @ApiPropertyOptional({ example: 1 }) @IsOptional() @IsNumber() @Min(0) @Type(() => Number) points?: number;
  @ApiPropertyOptional({ example: 0 }) @IsOptional() @IsInt() @Type(() => Number) sortOrder?: number;
  @ApiPropertyOptional({ type: [QuizOptionDto] }) @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => QuizOptionDto) options?: QuizOptionDto[];
}