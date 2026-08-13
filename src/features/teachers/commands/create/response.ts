import { ApiProperty } from '@nestjs/swagger';
export class CreateTeacherResponse {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() fullName: string;
  @ApiProperty() phone: string;
  @ApiProperty({ description: 'Tizimga kirish uchun ID (faqat shu javobda ko\'rsatiladi)' }) loginId: string;
  @ApiProperty({ description: 'Vaqtinchalik parol (faqat shu javobda ko\'rsatiladi)' }) tempPassword: string;
  @ApiProperty() createdAt: Date;
}