import { ApiProperty } from '@nestjs/swagger';
export class MarkBulkAttendanceResponse { @ApiProperty() count: number; @ApiProperty() message: string; }