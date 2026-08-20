export class MarkLessonTeacherResponse {
  id: string;
  groupId: string;
  date: string;
  assignedTeacherId: string;
  actualTeacherId: string | null;
  status: string;
  isSubstitution: boolean;
  attendanceMarkedAt: Date | null;
}
