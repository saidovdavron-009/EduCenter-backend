export class GetOneLessonSessionResponse {
  id: string;
  groupId: string;
  date: string;
  plannedStartTime: string;
  plannedEndTime: string;
  assignedTeacherId: string;
  actualTeacherId: string | null;
  status: string;
  isSubstitution: boolean;
  attendanceMarkedAt: Date | null;
}
