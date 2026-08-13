import { ApiProperty } from '@nestjs/swagger';
import { StudentStatus } from '../../../../common/types';

export class CreateStudentResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ nullable: true })
  parentPhone: string | null;

  @ApiProperty({ description: 'Tizimga kirish uchun ID (faqat shu javobda ko\'rsatiladi)' })
  loginId: string;

  @ApiProperty({ description: 'Vaqtinchalik parol (faqat shu javobda ko\'rsatiladi)' })
  tempPassword: string;

  @ApiProperty({ enum: StudentStatus })
  status: StudentStatus;

  @ApiProperty()
  createdAt: Date;
}