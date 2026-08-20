export class LockMonthlyPayrollResponse {
  id: string;
  teacherId: string;
  year: number;
  month: number;
  totalLessonsPlanned: number;
  totalLessonsConducted: number;
  totalAmount: number;
  isLocked: boolean;
}
