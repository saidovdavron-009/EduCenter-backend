import { ApiProperty } from '@nestjs/swagger';
export class TeacherListItem {
  @ApiProperty() id: string;
  @ApiProperty() fullName: string;
  @ApiProperty() phone: string;
  @ApiProperty({ nullable: true }) avatarUrl: string | null;
  @ApiProperty({ type: [String] }) subjects: string[];
  @ApiProperty() salary: number;
  @ApiProperty() groupCount: number;
  @ApiProperty() isActive: boolean;
}