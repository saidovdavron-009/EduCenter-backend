import { ApiProperty } from '@nestjs/swagger';
export class AttendanceReportItem {
  @ApiProperty() studentId: string;
  @ApiProperty() studentName: string;
  @ApiProperty() present: number;
  @ApiProperty() absent: number;
  @ApiProperty() late: number;
  @ApiProperty() excused: number;
  @ApiProperty() total: number;
  @ApiProperty() percentage: number;
}