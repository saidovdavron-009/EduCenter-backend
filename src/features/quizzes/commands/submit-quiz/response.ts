export class SubmitQuizResponse {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  maxScore: number;
  percentage: number;
  finishedAt: Date;
}