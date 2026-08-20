export class AssignSubstituteTeacherResponse {
  id: string;
  groupId: string;
  date: string;
  assignedTeacherId: string;
  actualTeacherId: string | null;
  isSubstitution: boolean;
  status: string;
}
