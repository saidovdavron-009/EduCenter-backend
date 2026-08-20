import { BadRequestException } from '@nestjs/common';

interface LessonWindow {
  startTime: string;
  endTime: string;
}

// Davomat faqat dars boshlangandan tugaguncha bo'lgan oraliqda belgilanishi mumkin —
// na oldin, na keyin. Bu backend tekshiruvi — frontenddagi disabled tugma buni
// almashtira olmaydi (tizim soati o'zgartirilib chetlab o'tilmasligi uchun).
// `opts.bypass` — faqat super-admin "kechiktirilgan tuzatish" huquqi bilan
// chaqiruvchi tomonidan (sabab kiritilgach, audit log yozilgach) beriladi.
export function assertWithinLessonWindow(
  schedule: LessonWindow,
  dateStr: string,
  opts?: { now?: Date; bypass?: boolean },
): void {
  if (opts?.bypass) return;
  const now = opts?.now ?? new Date();
  const start = new Date(`${dateStr}T${schedule.startTime}`);
  const end = new Date(`${dateStr}T${schedule.endTime}`);
  if (now < start || now > end) {
    throw new BadRequestException('Davomat faqat dars vaqti ichida (boshlanishidan tugashigacha) belgilanishi mumkin');
  }
}

// Almashtiruvchi o'qituvchi dars tugashiga qadar (o'sha kuni ertalab yoki dars
// vaqti ichida) belgilanishi mumkin — lekin tugagandan keyin emas. Davomatning
// o'zi (mark-teacher) hamon faqat dars vaqti ichida yakunlanadi.
export function assertBeforeLessonEnds(schedule: { endTime: string }, dateStr: string, now: Date = new Date()): void {
  const end = new Date(`${dateStr}T${schedule.endTime}`);
  if (now > end) {
    throw new BadRequestException("Almashtiruvchi o'qituvchi faqat dars tugashiga qadar belgilanishi mumkin");
  }
}
