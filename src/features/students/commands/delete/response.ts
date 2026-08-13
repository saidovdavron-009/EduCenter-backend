import { ApiProperty } from '@nestjs/swagger';

export class DeleteStudentResponse {
  @ApiProperty()
  message: string;
}