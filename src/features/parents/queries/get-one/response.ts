export class GetOneParentResponse {
  id: string;
  fullName: string;
  phone: string;
  userId: string;
  loginId: string | null;
  createdAt: Date;
  students?: { id: string; fullName: string; phone: string; avatarUrl: string | null; status: string }[];
}