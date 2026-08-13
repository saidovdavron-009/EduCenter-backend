import { ApiProperty } from '@nestjs/swagger';
import { StudentStatus, Gender } from '../../../../common/types';

export class GetOneStudentResponse {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() fullName: string;
  @ApiProperty() phone: string;
  @ApiProperty({ nullable: true }) parentPhone: string | null;
  @ApiProperty({ nullable: true }) parentEmail: string | null;
  @ApiProperty({ nullable: true }) email: string | null;
  @ApiProperty({ nullable: true }) loginId: string | null;
  @ApiProperty({ nullable: true }) dob: Date | null;
  @ApiProperty({ enum: Gender, nullable: true }) gender: Gender | null;
  @ApiProperty({ nullable: true }) address: string | null;
  @ApiProperty({ nullable: true }) avatarUrl: string | null;
  @ApiProperty({ enum: StudentStatus }) status: StudentStatus;
  @ApiProperty({ nullable: true }) referralSource: string | null;
  @ApiProperty({ nullable: true }) notes: string | null;
  @ApiProperty({ type: 'array', items: { type: 'object' } }) groups: any[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}