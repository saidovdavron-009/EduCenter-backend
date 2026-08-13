export class GetAllParentsResponse {
  data: { id: string; fullName: string; phone: string; userId: string; loginId: string | null; createdAt: Date }[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}