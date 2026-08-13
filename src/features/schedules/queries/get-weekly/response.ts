import { ApiProperty } from '@nestjs/swagger';
export class WeeklyScheduleResponse {
  @ApiProperty() MON: any[];
  @ApiProperty() TUE: any[];
  @ApiProperty() WED: any[];
  @ApiProperty() THU: any[];
  @ApiProperty() FRI: any[];
  @ApiProperty() SAT: any[];
  @ApiProperty() SUN: any[];
}