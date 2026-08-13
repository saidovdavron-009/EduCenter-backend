import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class LinkStudentRequest {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiProperty() @IsUUID() parentId: string;
}