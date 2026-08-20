export class GetTeacherPayrollReportResponse {
  teacherId: string;
  year: number;
  month: number;
  // O'zining schedule'i bo'yicha shu oyda rejalashtirilgan darslar soni.
  lessonsPlanned: number;
  // O'zi shaxsan o'tgan (o'z darslari, boshqasiga bermagan).
  lessonsConducted: number;
  // O'z rejalashtirilgan darsini o'zi o'tmagan (yoki almashtirilgan, yoki umuman bo'lmagan).
  lessonsMissed: number;
  // Boshqa o'qituvchi(lar) guruhida almashtiruvchi sifatida o'tgan darslar soni.
  lessonsSubstitutedElsewhere: number;
}
