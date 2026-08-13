import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ example: '123456', description: 'Login ID (admin tomonidan berilgan)' })
  @IsString()
  @MinLength(3)
  login: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @MinLength(4, { message: 'Parol kamida 4 ta belgi bo\'lishi kerak' })
  password: string;
}