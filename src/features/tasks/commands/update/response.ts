export class UpdateTaskResponse {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
  status: string;
  priority: string;
  deadline: Date;
  updatedAt: Date;
}