import { ApiProperty } from '@nestjs/swagger';
export class UpdateScheduleResponse { @ApiProperty() id: string; @ApiProperty() updatedAt: Date; }