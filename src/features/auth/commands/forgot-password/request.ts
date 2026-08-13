import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordRequest {
  @ApiProperty({ example: 'user@educenter.uz' })
  @IsEmail({}, { message: 'Email noto\'g\'ri formatda' })
  email: string;
}