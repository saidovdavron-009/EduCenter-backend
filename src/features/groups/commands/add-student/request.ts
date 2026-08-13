import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddStudentToGroupRequest {
  @ApiProperty() @IsUUID() studentId: string;
}