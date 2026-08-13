export class UpdateTeacherAttendanceResponse {
  id: string;
  teacherId: string;
  date: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
  note: string;
}