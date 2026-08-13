import { ApiProperty } from '@nestjs/swagger';
export class UpdateAttendanceResponse { @ApiProperty() id: string; @ApiProperty() updatedAt: Date; }