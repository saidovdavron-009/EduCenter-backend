import { ApiProperty } from '@nestjs/swagger';
import { StudentStatus } from '../../../../common/types';

export class StudentListItem {
  @ApiProperty() id: string;
  @ApiProperty() fullName: string;
  @ApiProperty() phone: string;
  @ApiProperty({ nullable: true }) parentPhone: string | null;
  @ApiProperty({ nullable: true }) email: string | null;
  @ApiProperty({ nullable: true }) loginId: string | null;
  @ApiProperty({ nullable: true }) avatarUrl: string | null;
  @ApiProperty({ enum: StudentStatus }) status: StudentStatus;
  @ApiProperty() groupCount: number;
  @ApiProperty() createdAt: Date;
}

export class GetAllStudentsResponse {
  @ApiProperty({ type: [StudentListItem] })
  data: StudentListItem[];

  @ApiProperty()
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}