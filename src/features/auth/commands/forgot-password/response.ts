import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponse {
  @ApiProperty()
  message: string;
}