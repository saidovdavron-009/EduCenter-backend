import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @ApiProperty() @IsUUID() questionId: string;
  @ApiProperty() @IsUUID() selectedOptionId: string;
}

export class SubmitQuizRequest {
  @ApiProperty({ type: [AnswerDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => AnswerDto) answers: AnswerDto[];
}