import { ApiProperty } from '@nestjs/swagger';
import { StudentStatus } from '../../../../common/types';

export class UpdateStudentResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty({ enum: StudentStatus })
  status: StudentStatus;

  @ApiProperty()
  updatedAt: Date;
}