import { ApiProperty } from '@nestjs/swagger';
export class UpdateSubjectResponse {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() updatedAt: Date;
}