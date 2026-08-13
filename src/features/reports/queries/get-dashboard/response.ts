import { ApiProperty } from '@nestjs/swagger';
export class DashboardStatsResponse {
  @ApiProperty() totalStudents: number;
  @ApiProperty() activeStudents: number;
  @ApiProperty() totalTeachers: number;
  @ApiProperty() totalGroups: number;
  @ApiProperty() monthlyRevenue: number;
  @ApiProperty() pendingPayments: number;
  @ApiProperty() todayAttendanceRate: number;
  @ApiProperty() totalAttendanceRate: number;
  @ApiProperty() recentActivities: any[];
}