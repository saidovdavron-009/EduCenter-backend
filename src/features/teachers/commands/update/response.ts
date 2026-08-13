import { ApiProperty } from '@nestjs/swagger';
export class UpdateTeacherResponse { @ApiProperty() id: string; @ApiProperty() updatedAt: Date; }