import { ApiProperty } from '@nestjs/swagger';
export class UpdateGradeResponse { @ApiProperty() id: string; @ApiProperty() updatedAt: Date; }