export class CreateQuizResponse {
  id: string;
  groupId: string;
  title: string;
  timeLimitMins: number;
  isPublished: boolean;
  createdAt: Date;
}