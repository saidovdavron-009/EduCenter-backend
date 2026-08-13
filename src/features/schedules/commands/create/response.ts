import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '../../../../common/types';
export class CreateScheduleResponse {
  @ApiProperty() id: string;
  @ApiProperty() groupId: string;
  @ApiProperty({ enum: DayOfWeek }) dayOfWeek: DayOfWeek;
  @ApiProperty() startTime: string;
  @ApiProperty() endTime: string;
  @ApiProperty({ nullable: true }) room: string | null;
  @ApiProperty() createdAt: Date;
}