export class CreateTeacherSalaryResponse {
  id: string;
  teacherId: string;
  baseAmount: number;
  bonus: number;
  fine: number;
  totalPaid: number;
  periodStart: string;
  periodEnd: string;
  isPaid: boolean;
}
