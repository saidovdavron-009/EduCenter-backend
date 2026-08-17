import { ApiProperty } from '@nestjs/swagger';

export class ResetTeacherPasswordResponse {
  @ApiProperty()
  message: string;
}
