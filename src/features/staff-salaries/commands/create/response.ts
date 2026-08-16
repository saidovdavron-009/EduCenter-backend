export class CreateStaffSalaryResponse {
  id: string;
  employeeId: string;
  baseAmount: number;
  bonus: number;
  fine: number;
  totalPaid: number;
  periodStart: string;
  periodEnd: string;
  isPaid: boolean;
}
