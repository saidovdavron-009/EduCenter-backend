import { ApiProperty } from '@nestjs/swagger';
export class SubjectItem {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true }) description: string | null;
  @ApiProperty({ nullable: true }) level: string | null;
  @ApiProperty() monthlyFee: number;
  @ApiProperty({ type: [String], nullable: true }) days: string[] | null;
  @ApiProperty() isActive: boolean;
  @ApiProperty() groupCount: number;
}