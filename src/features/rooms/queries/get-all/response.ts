export class GetAllRoomsResponse {
  data: { id: string; branchId: string; name: string; capacity: number; isActive: boolean }[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}