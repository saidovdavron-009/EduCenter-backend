import { ApiProperty } from '@nestjs/swagger';
export class MonthlyAttendanceResponse { @ApiProperty() month: number; @ApiProperty() year: number; @ApiProperty() data: any[]; }