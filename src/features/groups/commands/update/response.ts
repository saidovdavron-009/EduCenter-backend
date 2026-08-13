import { ApiProperty } from '@nestjs/swagger';
export class UpdateGroupResponse { @ApiProperty() id: string; @ApiProperty() updatedAt: Date; }