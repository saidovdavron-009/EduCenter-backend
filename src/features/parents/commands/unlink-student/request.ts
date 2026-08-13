import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UnlinkStudentRequest {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiProperty() @IsUUID() parentId: string;
}