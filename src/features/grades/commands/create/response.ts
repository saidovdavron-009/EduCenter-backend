import { ApiProperty } from '@nestjs/swagger';
import { GradeType } from '../../../../common/types';
export class CreateGradeResponse {
  @ApiProperty() id: string; @ApiProperty() studentId: string;
  @ApiProperty({ enum: GradeType }) type: GradeType;
  @ApiProperty() score: number; @ApiProperty() maxScore: number; @ApiProperty() createdAt: Date;
}