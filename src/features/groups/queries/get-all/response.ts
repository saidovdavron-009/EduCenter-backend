import { ApiProperty } from '@nestjs/swagger';
import { GroupStatus } from '../../../../common/types';
export class GroupListItem {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() subjectName: string;
  @ApiProperty() teacherName: string;
  @ApiProperty() branchName: string;
  @ApiProperty() capacity: number;
  @ApiProperty() currentCount: number;
  @ApiProperty() monthlyFee: number;
  @ApiProperty({ enum: GroupStatus }) status: GroupStatus;
}