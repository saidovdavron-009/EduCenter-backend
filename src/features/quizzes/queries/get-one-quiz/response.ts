export class GetOneQuizResponse {
  id: string;
  groupId: string;
  title: string;
  description: string;
  timeLimitMins: number;
  isPublished: boolean;
  questions?: any[];
  createdAt: Date;
}