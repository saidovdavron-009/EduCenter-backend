import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength, Matches } from 'class-validator';

export class ResetPasswordRequest {
  @ApiProperty({ example: 'user@educenter.uz' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6, { message: 'OTP kod 6 ta raqamdan iborat bo\'lishi kerak' })
  code: string;

  @ApiProperty({ example: 'NewPassword123' })
  @IsString()
  @MinLength(8, { message: 'Parol kamida 8 ta belgi bo\'lishi kerak' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Parol katta harf, kichik harf va raqamdan iborat bo\'lishi kerak',
  })
  newPassword: string;
}