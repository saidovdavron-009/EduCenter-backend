import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '../../../../common/types';
export class MarkAttendanceResponse {
  @ApiProperty() id: string;
  @ApiProperty() scheduleId: string;
  @ApiProperty() studentId: string;
  @ApiProperty({ enum: AttendanceStatus }) status: AttendanceStatus;
  @ApiProperty() date: Date;
}