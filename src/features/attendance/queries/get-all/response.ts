import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '../../../../common/types';
export class AttendanceItem {
  @ApiProperty() id: string;
  @ApiProperty() studentName: string;
  @ApiProperty() groupName: string;
  @ApiProperty({ enum: AttendanceStatus }) status: AttendanceStatus;
  @ApiProperty() date: string;
  @ApiProperty({ nullable: true }) note: string | null;
}