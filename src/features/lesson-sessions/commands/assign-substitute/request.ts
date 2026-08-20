import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssignSubstituteTeacherRequest {
  @ApiProperty() @IsUUID() substituteTeacherId: string;
}
