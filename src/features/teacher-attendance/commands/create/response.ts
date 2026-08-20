export class CreateTeacherAttendanceResponse {
  id: string;
  teacherId: string;
  date: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
  note: string;
}
