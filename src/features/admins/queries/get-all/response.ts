import { ApiProperty } from '@nestjs/swagger';

export class AdminListItem {
  @ApiProperty() id: string;
  @ApiProperty({ nullable: true }) loginId: string | null;
  @ApiProperty({ nullable: true }) fullName: string | null;
  @ApiProperty({ nullable: true }) phone: string | null;
  @ApiProperty() isActive: boolean;
  @ApiProperty() isSuperAdmin: boolean;
  @ApiProperty() createdAt: Date;
}
