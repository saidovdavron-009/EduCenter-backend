import { ApiProperty } from '@nestjs/swagger';
export class GradeSubmissionResponse { @ApiProperty() id: string; @ApiProperty() score: number; @ApiProperty() gradedAt: Date; }