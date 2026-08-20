export class TodayLessonSessionItem {
  id: string;
  groupId: string;
  groupName: string;
  date: string;
  plannedStartTime: string;
  plannedEndTime: string;
  assignedTeacherId: string;
  assignedTeacherName: string;
  actualTeacherId: string | null;
  actualTeacherName: string | null;
  status: string;
  isSubstitution: boolean;
  // Hozir dars vaqti oynasi ichidami — true bo'lsa "Davomat qilish"/"Almashtirish" faol.
  canMarkAttendance: boolean;
  // Frontend qatorni disable qilishi uchun: ONGOING | ENDED.
  windowState: 'ONGOING' | 'ENDED';
}

export class GetTodayLessonSessionsResponse {
  date: string;
  data: TodayLessonSessionItem[];
}
