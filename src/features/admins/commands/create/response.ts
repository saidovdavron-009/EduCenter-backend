import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminResponse {
  @ApiProperty() id: string;
  @ApiProperty() loginId: string;
  @ApiProperty() tempPassword: string;
  @ApiProperty({ nullable: true }) fullName: string | null;
  @ApiProperty() createdAt: Date;
}
