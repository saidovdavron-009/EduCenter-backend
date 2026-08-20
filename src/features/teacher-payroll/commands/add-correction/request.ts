import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AddPayrollCorrectionRequest {
  @ApiProperty() @IsUUID() monthlyPayrollSummaryId: string;
  // Musbat — qo'shimcha to'lov, manfiy — ushlab qolish.
  @ApiProperty({ example: -50000 }) @Type(() => Number) @IsNumber() amount: number;
  @ApiProperty() @IsString() @IsNotEmpty() reason: string;
}
