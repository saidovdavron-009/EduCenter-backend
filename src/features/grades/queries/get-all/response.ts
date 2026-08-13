import { ApiProperty } from '@nestjs/swagger';
import { GradeType } from '../../../../common/types';
export class GradeItem {
  @ApiProperty() id: string; @ApiProperty() studentName: string; @ApiProperty() teacherName: string;
  @ApiProperty({ enum: GradeType }) type: GradeType; @ApiProperty() score: number;
  @ApiProperty() maxScore: number; @ApiProperty({ nullable: true }) comment: string | null; @ApiProperty() date: string;
}