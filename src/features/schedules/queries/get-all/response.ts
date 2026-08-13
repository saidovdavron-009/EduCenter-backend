import { ApiProperty } from '@nestjs/swagger';
export class ScheduleItem {
  @ApiProperty() id: string;
  @ApiProperty() groupId: string;
  @ApiProperty() groupName: string;
  @ApiProperty() subjectName: string;
  @ApiProperty() teacherName: string;
  @ApiProperty() dayOfWeek: string;
  @ApiProperty() startTime: string;
  @ApiProperty() endTime: string;
  @ApiProperty({ nullable: true }) room: string | null;
}