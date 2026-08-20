import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsBoolean, IsString } from 'class-validator';

export class MarkLessonTeacherRequest {
  // Berilmasa — sessiyada avval belgilangan actualTeacherId (assign-substitute
  // orqali) yoki assignedTeacherId ishlatiladi. "Davomat qilish" tugmasi odatda
  // buni bermaydi — allaqachon ma'lum bo'lgan o'qituvchini tasdiqlaydi.
  @ApiPropertyOptional() @IsOptional() @IsUUID() actualTeacherId?: string;

  // false — hech kim dars o'tmagan (status NOT_CONDUCTED), hech kimga pul yozilmaydi.
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() conducted?: boolean;

  // Faqat super-admin uchun — dars vaqti oynasidan tashqarida yakunlashga
  // ruxsat beradi. Sabab majburiy, audit_logs ga yoziladi.
  @ApiPropertyOptional() @IsOptional() @IsString() lateCorrectionReason?: string;
}
