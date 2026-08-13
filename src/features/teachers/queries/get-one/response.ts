import { ApiProperty } from '@nestjs/swagger';
import { SalaryType } from '../../../../common/types';

export class GetOneTeacherResponse {
  @ApiProperty() id: string;
  @ApiProperty() fullName: string;
  @ApiProperty() phone: string;
  @ApiProperty({ nullable: true }) email: string | null;
  @ApiProperty({ type: [String] }) subjects: string[];
  @ApiProperty({ nullable: true }) experience: number | null;
  @ApiProperty({ enum: SalaryType }) salaryType: SalaryType;
  @ApiProperty() salary: number;
  @ApiProperty({ nullable: true }) avatarUrl: string | null;
  @ApiProperty({ nullable: true }) bio: string | null;
  @ApiProperty() isActive: boolean;
  @ApiProperty({ type: 'array', items: { type: 'object' } }) groups: any[];
  @ApiProperty() createdAt: Date;
}