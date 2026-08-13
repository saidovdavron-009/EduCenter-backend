import { ApiProperty } from '@nestjs/swagger';
export class SubmitHomeworkResponse { @ApiProperty() id: string; @ApiProperty() submittedAt: Date; }