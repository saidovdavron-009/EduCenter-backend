import { ApiProperty } from '@nestjs/swagger';

export class ResetStudentPasswordResponse {
  @ApiProperty()
  message: string;
}
