import { ApiProperty } from '@nestjs/swagger';
export class UpdateHomeworkResponse { @ApiProperty() id: string; @ApiProperty() updatedAt: Date; }