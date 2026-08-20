export class GetMonthlyPayrollSummaryResponse {
  teacherId: string;
  year: number;
  month: number;
  totalLessonsPlanned: number;
  totalLessonsConducted: number;
  totalAmount: number;
  isLocked: boolean;
  correctionsTotal: number;
  finalAmount: number;
}
