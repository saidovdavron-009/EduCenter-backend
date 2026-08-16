import { ApiProperty } from '@nestjs/swagger';
import { GroupStatus } from '../../../../common/types';
export class CreateGroupResponse {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() subjectId: string;
  @ApiProperty() teacherId: string;
  @ApiProperty() branchId: string;
  @ApiProperty() capacity: number;
  @ApiProperty() monthlyFee: number;
  @ApiProperty({ enum: GroupStatus }) status: GroupStatus;
  @ApiProperty() createdAt: Date;
}