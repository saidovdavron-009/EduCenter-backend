export class CreateTaskResponse {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
  status: string;
  priority: string;
  deadline: Date;
  createdAt: Date;
}