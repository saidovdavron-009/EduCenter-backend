import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResponse {
  @ApiProperty()
  message: string;
}