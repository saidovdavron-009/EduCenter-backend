import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectResponse {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true }) description: string | null;
  @ApiProperty({ nullable: true }) level: string | null;
  @ApiProperty() createdAt: Date;
}