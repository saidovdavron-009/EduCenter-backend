import { ApiProperty } from '@nestjs/swagger';
export class TeachersReportResponse { @ApiProperty() total: number; @ApiProperty() activeTeachers: any[]; }