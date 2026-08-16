import { ApiProperty } from '@nestjs/swagger';
import { GroupStatus } from '../../../../common/types';
export class GetOneGroupResponse {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() subjectId: string;
  @ApiProperty() teacherId: string;
  @ApiProperty() branchId: string;
  @ApiProperty() branchName: string;
  @ApiProperty() capacity: number;
  @ApiProperty() currentCount: number;
  @ApiProperty() monthlyFee: number;
  @ApiProperty({ enum: GroupStatus }) status: GroupStatus;
  @ApiProperty({ type: 'array' }) students: any[];
  @ApiProperty({ type: 'array' }) schedules: any[];
}