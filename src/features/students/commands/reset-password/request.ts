import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetStudentPasswordRequest {
  @ApiProperty({ example: 'yangiParol123' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
